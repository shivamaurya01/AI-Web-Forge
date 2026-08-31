import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"


const userRouter = express.Router()


userRouter.get("/me", isAuth, getCurrentUser)

export default userRouter

// http:localhost:8000/api/auth/logout