// USERNAME

let name=localStorage.getItem("username")

if(!name){

name=prompt("Enter your name")

localStorage.setItem("username",name)

}

document.getElementById("username").innerText=name



// VARIANT

let variant=localStorage.getItem("variant")

if(!variant){

variant=Math.random()<0.5?"A":"B"

localStorage.setItem("variant",variant)

}



// VISITS

let visits=JSON.parse(localStorage.getItem("visits")||'{"A":0,"B":0}')

visits[variant]++

localStorage.setItem("visits",JSON.stringify(visits))



// CART

document.getElementById("addCart").onclick=function(){

let cart=JSON.parse(localStorage.getItem("cart")||"[]")

cart.push("protein")

localStorage.setItem("cart",JSON.stringify(cart))

document.getElementById("cartCount").innerText=cart.length



let conv=JSON.parse(localStorage.getItem("conv")||'{"A":0,"B":0}')

conv[variant]++

localStorage.setItem("conv",JSON.stringify(conv))

}



// DISCOUNT

let discount=localStorage.getItem("discount")

if(discount){

let newPrice=Math.round(2249*(1-discount/100))

document.getElementById("price").innerText="₹"+newPrice

document.getElementById("discountTag").innerText=discount+"% GAME"

}



// LEADERBOARD

function updateLeaderboard(){

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

updateLeaderboard()



// SCROLL TRACK

window.addEventListener("scroll",()=>{

let scroll=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100

localStorage.setItem("scroll",scroll)

})
