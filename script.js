// ===============================
// script.js - experiment + UI logic
// ===============================

// Helper toast
function showToast(msg, timeout = 2000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.add('hidden'), timeout);
}

// -------------------------------
// User / Account
// -------------------------------
function getDisplayName() {
  return localStorage.getItem('ff_name') || null;
}
function ensureUsername() {
  let name = getDisplayName();
  if (!name) {
    const modal = document.getElementById('usernameModal');
    modal.classList.remove('hidden');
    document.getElementById('saveNameBtn').onclick = () => {
      const v = document.getElementById('usernameInput').value.trim();
      if (!v) { showToast('Please enter a name'); return; }
      localStorage.setItem('ff_name', v);
      modal.classList.add('hidden');
      renderLeaderboard(); updateDashboard();
      showToast('Name saved');
    };
  }
}

// -------------------------------
// A/B assignment
// -------------------------------
function assignVariant(){
  let variant = localStorage.getItem("variant");
  if (!variant) {
    variant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem("variant", variant);
  }
  return variant;
}
const variant = assignVariant();
console.log('Assigned variant:', variant);

// GA experiment view (only if gtag exists)
if (typeof gtag !== 'undefined') {
  gtag('event','experiment_view',{ experiment_name:'discount_test', variant });
}

// -------------------------------
// Cart logic (localStorage)
// -------------------------------
function getCart() {
  return JSON.parse(localStorage.getItem('ff_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('ff_cart', JSON.stringify(cart));
}
function addToCartItem(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  updateCartCount();
  showToast('Added to cart (demo)');
}

// Update cart count badge
function updateCartCount() {
  const cnt = getCart().length;
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cnt;
  const el2 = document.getElementById('userCartCount');
  if (el2) el2.textContent = cnt;
}

// -------------------------------
// Leaderboard (localStorage)
// -------------------------------
function saveLeaderboardEntry(entry) {
  const list = JSON.parse(localStorage.getItem('ff_leaderboard') || '[]');
  list.push(entry);
  // sort by discount desc then wins desc then date
  list.sort((a,b) => (b.discount - a.discount) || (b.wins - a.wins) || (new Date(b.date) - new Date(a.date)));
  const top = list.slice(0, 10);
  localStorage.setItem('ff_leaderboard', JSON.stringify(top));
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = JSON.parse(localStorage.getItem('ff_leaderboard') || '[]');
  const ol = document.getElementById('leaderboardList');
  if (!ol) return;
  ol.innerHTML = '';
  if (list.length === 0) {
    ol.innerHTML = '<li>No scores yet — play the Lucky Egg game!</li>';
    return;
  }
  list.forEach(l => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${escapeHtml(l.name)}</span><span>${l.discount}% (${l.wins} wins)</span>`;
    ol.appendChild(li);
  });
}

// small escape
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

// -------------------------------
// Apply variant and game discount on page load
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
  ensureUsername();
  updateCartCount();

  // Elements
  const newPriceEl = document.getElementById('newPrice');
  const discountTxtEl = document.getElementById('discountTxt');
  const userVariantEl = document.getElementById('userVariant');
  const userDiscountEl = document.getElementById('userDiscount');
  const mobilePrice = document.getElementById('mobilePrice');
  const mobileDisc = document.getElementById('mobileDisc');
  const actionArea = document.getElementById('actionArea');

  // Show assigned variant
  if (userVariantEl) userVariantEl.textContent = variant;

  // Check for game discount saved earlier
  const gameDiscountPct = parseFloat(localStorage.getItem('game_discount_pct') || '0'); // 12.5 x wins etc
  if (gameDiscountPct > 0) {
    // apply game discount to UI
    if (newPriceEl) newPriceEl.textContent = discountedPriceText(gameDiscountPct);
    if (discountTxtEl) discountTxtEl.textContent = `${gameDiscountPct}% GAME DISCOUNT`;
    if (mobilePrice) mobilePrice.textContent = discountedPriceText(gameDiscountPct);
    if (mobileDisc) mobileDisc.textContent = `${gameDiscountPct}%`;
    if (userDiscountEl) userDiscountEl.textContent = `${gameDiscountPct}%`;
  } else {
    // default price
    if (newPriceEl) newPriceEl.textContent = '₹2,249';
    if (discountTxtEl) discountTxtEl.textContent = '22% OFF';
    if (mobilePrice) mobilePrice.textContent = '₹2,249';
    if (mobileDisc) mobileDisc.textContent = '22% OFF';
    if (userDiscountEl) userDiscountEl.textContent = '0%';
  }

  // Variant behaviors
  if (variant === 'A') {
    // Variant A: no extra UI (default)
    if (actionArea && !document.querySelector('.variant-a-note')) {
      const note = document.createElement('div');
      note.className = 'variant-a-note';
      note.style.marginTop = '10px';
      note.style.color = '#444';
      note.textContent = 'You are in Variant A — standard discount.';
      actionArea.appendChild(note);
    }
  } else {
    // Variant B: show game CTA
    if (actionArea && !document.querySelector('.game-cta-btn')) {
      const btn = document.createElement('button');
      btn.className = 'cta game-cta-btn';
      btn.style.marginLeft = '12px';
      btn.innerHTML = '🎯 Play Lucky Egg (3 chances)';
      btn.onclick = () => {
        // go to game page
        window.location.href = 'game.html';
      };
      actionArea.appendChild(btn);
    }
  }

  // Add-to-cart binds
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      // gather current discount and price shown
      const curDiscount = parseFloat(localStorage.getItem('game_discount_pct') || '0');
      const item = {
        id: 'fuelforge-protein',
        title: 'FuelForge Fermented Protein',
        price_label: (newPriceEl ? newPriceEl.textContent : '₹2249'),
        variant,
        discountPct: curDiscount,
        timestamp: new Date().toISOString()
      };
      addToCartItem(item);
      // don't send to checkout; show friendly message as this is a test
      showToast('Added to demo cart — this is a test site');
      if (typeof gtag !== 'undefined') {
        gtag('event','add_to_cart',{ product:item.title, variant, discount:item.discountPct });
      }
    };
  }

  // mobile buy binds
  const mobileAdd = document.getElementById('mobileAddBtn');
  if (mobileAdd) {
    mobileAdd.onclick = () => document.getElementById('addToCartBtn').click();
  }

  // header icons
  document.getElementById('accountBtn').onclick = () => {
    // open modal to set username
    document.getElementById('usernameModal').classList.remove('hidden');
  };
  document.getElementById('cartBtn').onclick = () => {
    window.location.href = 'cart.html';
  };

  // render leaderboard & dashboard
  renderLeaderboard();
  updateDashboard();
});

// -------------------------------
// Utility: compute discounted price string from pct
// -------------------------------
function discountedPriceText(discountPct) {
  // base price 2249
  const base = 2249;
  const price = Math.round(base * (1 - discountPct / 100));
  return `₹${price}`;
}

// -------------------------------
// Dashboard update
// -------------------------------
function updateDashboard() {
  const name = getDisplayName() || 'Guest';
  const variantEl = document.getElementById('userVariant');
  if (variantEl) variantEl.textContent = variant;
  const discountEl = document.getElementById('userDiscount');
  const pct = parseFloat(localStorage.getItem('game_discount_pct') || '0');
  if (discountEl) discountEl.textContent = `${pct}%`;
  const cartCountEl = document.getElementById('userCartCount');
  if (cartCountEl) cartCountEl.textContent = getCart().length || 0;
}

// Expose reset (for testing)
window.ff_reset = function(){
  localStorage.removeItem('variant');
  localStorage.removeItem('game_discount_pct');
  localStorage.removeItem('ff_cart');
  localStorage.removeItem('ff_leaderboard');
  localStorage.removeItem('ff_name');
  location.reload();
};

// On load update counts
updateCartCount();
