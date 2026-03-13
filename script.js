// USERNAME

let username=localStorage.getItem("username")

if(!username){

username=prompt("Enter your name")

localStorage.setItem("username",username)

}

document.getElementById("username").innerText=username



// CART

let cart=JSON.parse(localStorage.getItem("cart")||"[]")

document.getElementById("cartCount").innerText=cart.length

document.getElementById("addCart").onclick=function(){

cart.push("protein")

localStorage.setItem("cart",JSON.stringify(cart))

window.location.href="cart.html"

}



// LUCKY EGG GAME

let eggBtn=document.getElementById("playEggGame")
let game=document.getElementById("eggGame")

eggBtn.onclick=function(){

game.classList.toggle("hidden")

}

let eggs=document.querySelectorAll(".egg")

let chances=3

eggs.forEach(egg=>{

egg.onclick=function(){

if(chances<=0)return

chances--

let win=Math.random()<0.4

if(win){

egg.innerHTML="🥚💪"

let discount=12.5

alert("You found the protein! "+discount+"% discount!")

localStorage.setItem("discount",discount)

updateLeaderboard(discount)

location.reload()

}else{

egg.innerHTML="🥚❌"

}

}

})



// DISCOUNT

let discount=localStorage.getItem("discount")

if(discount){

let newPrice=Math.round(2249*(1-discount/100))

document.getElementById("price").innerText="₹"+newPrice

document.getElementById("discountTag").innerText=discount+"% GAME"

}



// LEADERBOARD

function updateLeaderboard(discount){

let board=JSON.parse(localStorage.getItem("leaderboard")||"[]")

let name=localStorage.getItem("username")

let existing=board.find(p=>p.name===name)

if(existing){

if(discount>existing.discount){

existing.discount=discount

}

}else{

board.push({name:name,discount:discount})

}

localStorage.setItem("leaderboard",JSON.stringify(board))

renderLeaderboard()

}

function renderLeaderboard(){

let data=JSON.parse(localStorage.getItem("leaderboard")||"[]")

data.sort((a,b)=>b.discount-a.discount)

let html=""

data.forEach(p=>{

html+=`<div class="player">
<span>${p.name}</span>
<span>${p.discount}%</span>
</div>`

})

document.getElementById("leaderboard").innerHTML=html

}

renderLeaderboard()
