import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { changes, deploy, generateWebsite, getAll, getBySlug, getWebsiteById } from "../controllers/website.controllers.js"


const websiteRouter = express.Router()


websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);
websiteRouter.get("/get-all", isAuth, getAll);
websiteRouter.get("/deploy/:id", isAuth, deploy);
websiteRouter.get("/get-by-slug/:slug", isAuth, getBySlug);




export default websiteRouter
