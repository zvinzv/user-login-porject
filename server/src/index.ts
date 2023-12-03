import express from "express";
import pool from "@/model/database"
import morgan from "morgan"
import cors from "cors"
import loginRoutes from "@/routes/auth/login"
import signRoutes from "@/routes/auth/sign"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Error403 } from "./model/Errors";
import User from "./model/user";
dotenv.config()
const secretJWT = process.env.secretJWT as string
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/v1/login", loginRoutes)
app.use("/api/v1/sign", signRoutes)



app.get("/", async (req,res)  => {
  if (!req.body.adminToken) return res.status(403).json(Error403("Access Denide !", "You Not Authorized To Enter The API !"))
  const user: any = jwt.verify(req.body.adminToken, secretJWT, (err:any, token:any) => {
    if (err) return res.status(403).json(Error403("Access Denide !", "You Not Authorized To Enter The API !"))
    return token
  })
  if (user.username !== "ZVNIZV" && user.role !== "full") return res.status(403).json(Error403("Access Denide !", "You Not Authorized To Enter The API !"))
  if (req.query.role) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE role = '${req.query.role}'`)
    return res.json({data: rows})
  }
  if (req.query.limit){
    const [rows] = await pool.query(`SELECT * FROM users LIMIT ${req.query.limit}`)
    return res.json({data: rows})
  }
  if (req.query.between){
    const [rows] = await pool.query(`SELECT * FROM users WHERE id BETWEEN ${(req.query.between as string).split(",")[0]} AND ${(req.query.between as string).split(",")[1]}`)
    return res.json({data: rows})
  }
  const [rows] = await pool.query(`SELECT * FROM users`)
  return res.json({data: rows})
})


app.use(cors())
app.listen(3000, () => {
  console.log("Server working on : http://localhost:3000")
})