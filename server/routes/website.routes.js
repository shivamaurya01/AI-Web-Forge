import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { changes, generateWebsite, getAll, getWebsiteById } from "../controllers/website.controllers.js"


const websiteRouter = express.Router()


websiteRouter.post("/generate", isAuth, generateWebsite)
websiteRouter.get("/update", isAuth, changes)
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById)
websiteRouter.get("/get-all", isAuth, getAll)




export default websiteRouter
