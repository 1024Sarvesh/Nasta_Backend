import express from  'express';
const userRouter = express.Router()
import{signup,login,forgetPassword,resetPassword} from "./controller.mjs"

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.patch("/forget_password",forgetPassword)
userRouter.patch("/reset_password",resetPassword)


export{userRouter}