import express from 'express'
import {prisma} from "./Prisma/prisma_client.mjs"
const app = express()
const port = 5000

app.use(express.json())


// app.post("/signup", async (req,res)=>{
//     console.log(req.body)
//     const user = await prisma.user.create({
//         data:{
//             email:req.body.email,
//             name:req.body.name,
//             password:req.body.password
//         }
//     })
//     res.json({user})
// })

app.post("/login",async (req,res)=>{
    const user=  await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })
    if(!user){
        res.status(404).json({
            "error":"user not found"
        })
        return
    }
    if(user.password !== req.body.password){
        res.status(401).json({
            "error":"password not found"
        })
        return
    }
    res.json({massage:"login successfull"})
})




app.listen(port,()=>{
console.log(`server started on ${port} `)
})
