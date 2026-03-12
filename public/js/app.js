
const socket = io()

function likeVideo(id){
 fetch("/videos/like/"+id,{method:"POST"})
 .then(r=>r.json())
 .then(d=>{
  document.getElementById("likes-"+id).innerText=d.likes
 })
}

function sendComment(e,id){
 e.preventDefault()
 const data=new FormData(e.target)

 fetch("/videos/comment/"+id,{method:"POST",body:data})
}

socket.on("likeUpdate",(d)=>{
 const el=document.getElementById("likes-"+d.id)
 if(el) el.innerText=d.likes
})

socket.on("newComment",(c)=>{
 console.log("new comment",c)
})
