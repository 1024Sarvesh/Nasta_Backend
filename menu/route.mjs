import {Router} from 'express';
import { createMenu, deleteMenu, getMenu, updateMenu } from './controller.mjs';
const menuRouter = Router()

const authentication = (req,res,next)=>{
console.log("check auth here")
next()}


// menuRouter.post("/createMenu",authentication,createMenu)
// .get("/",getMenu)
// .patch("/",authentication,updateMenu)
// .delete("/",authentication,deleteMenu)


menuRouter.get("/",getMenu)

menuRouter.use(authentication)

menuRouter.post("/createMenu",createMenu)
.patch("/",updateMenu)
.delete("/",deleteMenu)

export{menuRouter}
