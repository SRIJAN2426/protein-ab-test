document.getElementById("spinWheel").onclick=function(){

let discounts=[5,10,12.5,15,20]

let win=discounts[Math.floor(Math.random()*discounts.length)]

alert("You won "+win+"% discount!")

localStorage.setItem("discount",win)

let board=JSON.parse(localStorage.getItem("leaderboard")||"[]")

board.push({

name:localStorage.getItem("username"),
discount:win

})

localStorage.setItem("leaderboard",JSON.stringify(board))

location.reload()

}
