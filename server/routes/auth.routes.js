import express from "express"
import { googleAuth, logOut } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/google",googleAuth)
authRouter.get("/logout",logOut)

export default authRouter

// http:localhost:8000/api/auth/logout