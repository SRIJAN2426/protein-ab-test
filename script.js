// USER SYSTEM

function initUser(){

let name=localStorage.getItem("ff_name")

if(name){

document.getElementById("accountBtn").innerHTML=
`<i class="fa-regular fa-user"></i> ${name}`

}else{

document.getElementById("usernameModal").classList.remove("hidden")

}

}

document.addEventListener("DOMContentLoaded",initUser)


document.getElementById("saveNameBtn").onclick=function(){

let name=document.getElementById("usernameInput").value.trim()

if(!name)return

localStorage.setItem("ff_name",name)

document.getElementById("accountBtn").innerHTML=
`<i class="fa-regular fa-user"></i> ${name}`

document.getElementById("usernameModal").classList.add("hidden")

}



// A/B VARIANT

let variant=localStorage.getItem("variant")

if(!variant){

variant=Math.random()<0.5?"A":"B"

localStorage.setItem("variant",variant)

}

if(variant==="B"){

document.getElementById("playGameBtn").classList.remove("hidden")

}



// CART

function getCart(){
return JSON.parse(localStorage.getItem("ff_cart")||"[]")
}

function updateCart(){

document.getElementById("cartCount").innerText=getCart().length

}

updateCart()


document.getElementById("addToCartBtn").onclick=function(){

let cart=getCart()

cart.push({
product:"FuelForge Protein"
})

localStorage.setItem("ff_cart",JSON.stringify(cart))

updateCart()

alert("Added to demo cart.")

}



// GAME BUTTON

document.getElementById("playGameBtn").onclick=function(){

if(localStorage.getItem("game_played")==="true"){

alert("Game already played.")

return

}

window.location.href="game.html"

}



// DISCOUNT

let discount=localStorage.getItem("game_discount_pct")

if(discount){

let price=2249

let newPrice=Math.round(price*(1-discount/100))

document.getElementById("price").innerText=`₹${newPrice}`

document.getElementById("discount").innerText=`${discount}% GAME DISCOUNT`

}



// LEADERBOARD

function renderLeaderboard(){

let data=JSON.parse(localStorage.getItem("leaderboard")||"[]")

data.sort((a,b)=>b.discount-a.discount)

const container=document.getElementById("leaderboardList")

container.innerHTML=""

data.slice(0,10).forEach(p=>{

let row=document.createElement("div")

row.className="leaderboard-item"

row.innerHTML=`<div>${p.name}</div><div>${p.discount}%</div>`

container.appendChild(row)

})

}

renderLeaderboard()
