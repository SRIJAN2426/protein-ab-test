function assignVariant(){

let variant = localStorage.getItem("variant")

if(!variant){

variant = Math.random() < 0.5 ? "A" : "B"

localStorage.setItem("variant",variant)

}

return variant

}


const variant = assignVariant()


if(variant === "B"){

document.querySelector(".discount").innerText="LIMITED OFFER"

document.querySelector(".new-price").innerText="₹1999"

document.querySelector(".mobile-price").innerText="₹1999"

}


function addToCart(){

alert("Product added to cart")

window.location.href="cart.html"

}