
const socket = io()

function sendComment(){

 const name = document.getElementById("name").value
 const text = document.getElementById("text").value

 socket.emit("newComment",{name,text})

}

socket.on("commentBroadcast",(data)=>{

 const div = document.createElement("div")
 div.innerText = data.name + ": " + data.text

 document.getElementById("comments").appendChild(div)

})
