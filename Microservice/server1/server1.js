import express from "express"
import morgan from "morgan"
const app=express()

app.use(morgan('dev'))
app.get('/stress-test',(req,res)=>{
    for(let i=0;i<1000000000;i++){

    }

    res.send("Hello World")
})



app.listen(3001,()=>{
    console.log("Server is running on http://localhost:3001")
})
