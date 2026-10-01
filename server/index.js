import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"

import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"


const app = express()
app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://ai-web-forge-1.onrender.com",
    credentials: true,
    
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)

app.listen(port, ()=>{
    console.log("server started");
    connectDb()
})

