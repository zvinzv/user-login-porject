import express from "express"
import signController from "@/controller/auth/sign.controller"
const signRoutes = express.Router()

signRoutes.post("/", signController.signNew)
signRoutes.post("/admin", signController.signNewAdmin)

export default signRoutes