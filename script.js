// USERNAME

document.addEventListener("DOMContentLoaded",()=>{

let name=localStorage.getItem("ff_name")

if(!name){

document.getElementById("usernameModal").classList.remove("hidden")

}else{

document.getElementById("accountBtn").innerHTML=
`<i class="fa-regular fa-user"></i> ${name}`

}

})

document.getElementById("saveNameBtn").onclick=function(){

let name=document.getElementById("usernameInput").value.trim()

if(!name)return

localStorage.setItem("ff_name",name)

location.reload()

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



// VISIT TRACKING

let stats=JSON.parse(localStorage.getItem("ab_stats")||'{"A":0,"B":0}')

stats[variant]++

localStorage.setItem("ab_stats",JSON.stringify(stats))



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

cart.push({product:"FuelForge Protein",variant:variant})

localStorage.setItem("ff_cart",JSON.stringify(cart))

updateCart()

let conv=JSON.parse(localStorage.getItem("ab_conv")||'{"A":0,"B":0}')

conv[variant]++

localStorage.setItem("ab_conv",JSON.stringify(conv))

alert("Added to demo cart")

}



// SCROLL DEPTH TRACKING

window.addEventListener("scroll",()=>{

let scrollPercent=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100

localStorage.setItem("scroll_depth",Math.max(scrollPercent,
localStorage.getItem("scroll_depth")||0))

})



// CLICK HEATMAP

document.addEventListener("click",(e)=>{

let heatmap=JSON.parse(localStorage.getItem("heatmap")||"[]")

heatmap.push({x:e.clientX,y:e.clientY})

localStorage.setItem("heatmap",JSON.stringify(heatmap))

})



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

row.innerHTML=`<span>${p.name}</span><span>${p.discount}%</span>`

container.appendChild(row)

})

}

renderLeaderboard()
