// ===============================
// A/B TEST VARIANT ASSIGNMENT
// ===============================

function assignVariant(){

let variant = localStorage.getItem("variant")

if(!variant){

variant = Math.random() < 0.5 ? "A" : "B"

localStorage.setItem("variant",variant)

}

return variant

}


// Get variant
const variant = assignVariant()

console.log("User Variant:", variant)


// ===============================
// TRACK EXPERIMENT VIEW
// ===============================

if(typeof gtag !== "undefined"){

gtag('event','experiment_view',{
experiment_name:'discount_test',
variant:variant
})

}


// ===============================
// PAGE LOAD LOGIC
// ===============================

document.addEventListener("DOMContentLoaded", function(){


// ===============================
// GAME DISCOUNT CHECK
// ===============================

let gameDiscount = localStorage.getItem("game_discount")

if(gameDiscount){

document.querySelector(".new-price").innerText="₹1749"

document.querySelector(".discount").innerText="40% GAME DISCOUNT"

console.log("Game discount applied")

}


// ===============================
// VARIANT A
// ===============================

if(variant === "A"){

console.log("Showing Variant A")

document.querySelector(".discount").innerText="22% OFF"

document.querySelector(".new-price").innerText="₹2249"

}


// ===============================
// VARIANT B
// ===============================

if(variant === "B"){

console.log("Showing Variant B")

document.querySelector(".discount").innerText="Play Game to Unlock Discount"


// Create game button

let gameButton=document.createElement("button")

gameButton.innerText="🎮 Play 60s Game for 40% OFF"

gameButton.className="cta"

gameButton.style.marginTop="20px"


// Redirect to game

gameButton.onclick=function(){

window.location.href="game.html"

}


// Add button to product section

document.querySelector(".product-left").appendChild(gameButton)

}


})


// ===============================
// ADD TO CART TRACKING
// ===============================

function addToCart(){

console.log("Add to cart clicked")

if(typeof gtag !== "undefined"){

gtag('event','add_to_cart',{
product:'FuelForge Whey Protein',
variant:variant
})

}

alert("Product added to cart")

window.location.href="cart.html"

}


// ===============================
// RESET EXPERIMENT (OPTIONAL)
// ===============================

function resetExperiment(){

localStorage.removeItem("variant")
localStorage.removeItem("game_discount")

location.reload()

}
