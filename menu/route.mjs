import { Router } from "express";
import jwt from "jsonwebtoken";
const menuRouter = Router();
import { createMenu, deleteMenu, getMenu, updateMenu } from "./controller.mjs";
import { authentication } from "../middleware/authentication.mjs";

menuRouter.get("/getMenu", getMenu);

menuRouter.use(authentication);

menuRouter
  .post("/createMenu", createMenu)
  .patch("/updateMenu", updateMenu)
  .delete("/deleteMenu", deleteMenu);

// menuRouter.post("/createMenu",authentication,createMenu)
// .get("/",getMenu)
// .patch("/",authentication,updateMenu)
// .delete("/",authentication,deleteMenu)
export { menuRouter };
