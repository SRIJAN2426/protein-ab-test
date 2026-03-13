// Assign A/B test variant

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


// Track experiment view
gtag('event','experiment_view',{
experiment_name:'discount_test',
variant:variant
})


// Apply UI changes

document.addEventListener("DOMContentLoaded", function(){

if(variant === "A"){

document.querySelector(".discount").innerText="22% OFF"
document.querySelector(".new-price").innerText="₹2249"

}

if(variant === "B"){

document.querySelector(".discount").innerText="Play Game to Unlock 40% OFF"

let gameButton=document.createElement("button")

gameButton.innerText="Play 60 Second Game"

gameButton.className="cta"

gameButton.onclick=function(){

window.location.href="game.html"

}

document.querySelector(".product-left").appendChild(gameButton)

}

})


// Track add to cart

function addToCart(){

gtag('event','add_to_cart',{
product:'FuelForge Whey Protein',
variant:variant
})

alert("Product added to cart")

window.location.href="cart.html"

}
