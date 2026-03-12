
const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 name:String,
 text:String,
 video:{type:mongoose.Schema.Types.ObjectId,ref:"Video"}
})

module.exports=mongoose.model("Comment",schema)
