import {Router} from 'express';
const menuRouter = Router()
menuRouter.post("/",createMenu)
.get("/",getMenu)
.patch("/",updateMenu)
.delete("/",deleteMenu)

export{menuRouter}
