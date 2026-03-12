
const router=require("express").Router()
const admin=require("../middleware/admin")
const multer=require("multer")
const cloudinary=require("../config/cloudinary")
const Video=require("../models/Video")

const storage=multer.memoryStorage()
const upload=multer({storage})

router.post("/login",(req,res)=>{
 if(req.body.username===process.env.ADMIN_USER &&
    req.body.password===process.env.ADMIN_PASS){
  req.session.admin=true
 }
 res.redirect("/admin/panel")
})

router.get("/panel",admin,(req,res)=>{
 res.render("admin")
})

router.post("/upload",admin,upload.single("video"),async(req,res)=>{

 const stream=cloudinary.uploader.upload_stream(
  {resource_type:"video"},
  async(err,result)=>{
   if(result){
    await Video.create({title:req.body.title,url:result.secure_url})
    res.redirect("/videos")
   }
  }
 )

 stream.end(req.file.buffer)
})

module.exports=router
