
const router=require("express").Router()
const Video=require("../models/Video")
const Comment=require("../models/Comment")

router.get("/",async(req,res)=>{
 const videos=await Video.find()
 res.render("videos",{videos})
})

router.post("/like/:id",async(req,res)=>{
 const v=await Video.findById(req.params.id)
 v.likes++
 await v.save()
 req.io.emit("likeUpdate",{id:v.id,likes:v.likes})
 res.json({likes:v.likes})
})

router.post("/comment/:id",async(req,res)=>{
 const c=await Comment.create({
  name:req.body.name,
  text:req.body.text,
  video:req.params.id
 })
 req.io.emit("newComment",c)
 res.json(c)
})

module.exports=router
