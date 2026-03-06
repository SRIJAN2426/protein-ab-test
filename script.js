// Assign A/B test variant

function assignVariant(){

let variant = localStorage.getItem("variant")

if(!variant){

variant = Math.random() < 0.5 ? "A" : "B"

localStorage.setItem("variant",variant)

}

return variant

}


// Get the assigned variant
const variant = assignVariant()


// Track which variant user saw (Google Analytics event)

gtag('event','experiment_view',{
experiment_name:'price_ab_test',
variant: variant
});


// Apply variant changes to the page

if(variant === "B"){

document.querySelector(".discount").innerText = "LIMITED OFFER"

document.querySelector(".new-price").innerText = "₹1999"

document.querySelector(".mobile-price").innerText = "₹1999"

}



// Add to cart function with analytics tracking

function addToCart(){

gtag('event','add_to_cart',{
product:'FuelForge Whey Protein',
variant: variant
});

alert("Product added to cart")

window.location.href="cart.html"

}
