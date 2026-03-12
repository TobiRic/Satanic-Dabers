
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 title:String,
 url:String,
 likes:{type:Number,default:0},
 views:{type:Number,default:0}
})

module.exports=mongoose.model("Video",schema)
