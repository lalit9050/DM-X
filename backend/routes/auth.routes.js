import express from "express"
import { checkUserName, logOut, siqnIn, siqnUp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/siqnup",siqnUp)
authRouter.post("/siqnin",siqnIn)
authRouter.get("/logout",logOut)
authRouter.get("/check-username/:userName", checkUserName)


export default authRouter