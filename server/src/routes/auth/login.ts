import express from "express"
import loginController from "@/controller/auth/login.controller"
const loginRoutes = express.Router()

loginRoutes.post("/token", loginController.getInfoByToken)
loginRoutes.post("/", loginController.login)

export default loginRoutes