import express from 'express'
import {prisma} from "./Prisma/prisma_client.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const app = express()
const port = 5000

app.use(express.json())


app.post("/signup", async (req,res)=>{
    console.log(req.body)
    const hashedpassword = await bcrypt.hash(req.body.password,10)
    const user = await prisma.user.create({
        data:{
            email:req.body.email,
            name:req.body.name,
            password:hashedpassword
        }
    })
    res.json({user})
})

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
    if(!await bcrypt.compare(req.body.password,user.password)){
        res.status(401).json({
            "error":"password not found"
        })
        return
    }
    const token = jwt.sign({name:user.name,email:user.email},
        process.env.TOKEN_SECRET
    );
    res.json({massage:`login successfull welcome ${user.name}`,
        token:token
    
    })
})



app.listen(port,()=>{
console.log(`server started on ${port} `)
})
