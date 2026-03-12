
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

mongoose.connect(process.env.MONGODB_URI)

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.use(session({
 secret:"satanic_secret",
 resave:false,
 saveUninitialized:false,
 store:MongoStore.create({mongoUrl:process.env.MONGODB_URI})
}))

app.use((req,res,next)=>{
 req.io = io
 next()
})

app.use("/",require("./routes/pages"))
app.use("/videos",require("./routes/videos"))
app.use("/admin",require("./routes/admin"))

io.on("connection",(socket)=>{
 console.log("user connected")
})

server.listen(3000,()=>console.log("Server running"))
