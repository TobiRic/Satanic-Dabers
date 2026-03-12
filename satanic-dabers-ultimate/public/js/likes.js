
async function likeVideo(id){

 const res = await fetch("/videos/like/"+id,{method:"POST"})
 const data = await res.json()

 document.getElementById("likes-"+id).innerText = data.likes
}
