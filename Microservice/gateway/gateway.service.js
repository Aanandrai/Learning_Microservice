import express from "express"
import proxy from "express-http-proxy"

const app=express()

// This is running on this local system 
app.use("/stress-test", proxy('http://localhost:3001'))


// This route is running on another machine 
// we can access it by port forwarding
//for help refer to youtube, VS port forwording
// This is running on other Machine so "xyz" is port forwarding url 
app.use("/", proxy('http://xyz'))


app.listen(3000,()=>{
    console.log(`app is listen on post ${3000}`)
})

// app.use("/",proxy())