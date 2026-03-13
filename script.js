// USERNAME

function initUser(){

let name=localStorage.getItem("ff_name")

if(name){

document.getElementById("accountBtn").innerHTML=
`<i class="fa-regular fa-user"></i> ${name}`

return

}

document.getElementById("usernameModal").classList.remove("hidden")

document.getElementById("saveNameBtn").onclick=function(){

let v=document.getElementById("usernameInput").value.trim()

if(!v)return

localStorage.setItem("ff_name",v)

document.getElementById("accountBtn").innerHTML=
`<i class="fa-regular fa-user"></i> ${v}`

document.getElementById("usernameModal").classList.add("hidden")

}

}

document.addEventListener("DOMContentLoaded",initUser)


// CART

function getCart(){

return JSON.parse(localStorage.getItem("cart")||"[]")

}

function updateCart(){

document.getElementById("cartCount").innerText=getCart().length

}

document.getElementById("addToCartBtn").onclick=function(){

let cart=getCart()

cart.push({product:"FuelForge Protein"})

localStorage.setItem("cart",JSON.stringify(cart))

updateCart()

alert("Added to demo cart. This is an experiment site.")

}


// GAME BUTTON

document.getElementById("playGameBtn").onclick=function(){

if(localStorage.getItem("game_played")==="true"){

alert("You have already played the Lucky Egg game.")

return

}

window.location.href="game.html"

}


// LEADERBOARD

function renderLeaderboard(){

let data=JSON.parse(localStorage.getItem("leaderboard")||"[]")

const container=document.getElementById("leaderboardList")

container.innerHTML=""

data.forEach(p=>{

let row=document.createElement("div")

row.className="leaderboard-item"

row.innerHTML=`
<div>${p.name}</div>
<div>${p.discount}% (${p.wins} wins)</div>
`

container.appendChild(row)

})

}

renderLeaderboard()

updateCart()
