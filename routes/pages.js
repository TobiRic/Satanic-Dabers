
const router=require("express").Router()

router.get("/",(req,res)=>{
 res.render("home",{admin:req.session.admin})
})

router.get("/about",(req,res)=>res.render("about"))
router.get("/news",(req,res)=>res.render("news"))

module.exports=router
