import express from "express";
import pool from "@/model/database"
import morgan from "morgan"
import cors from "cors"
import loginRoutes from "@/routes/auth/login"
import signRoutes from "@/routes/auth/sign"
import dotenv from "dotenv"
const app = express()
dotenv.config()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/v1/login", loginRoutes)
app.use("/api/v1/sign", signRoutes)
app.use(cors())



app.get("/", async (req,res)  => {
  const [rows, feilds] = await pool.query("SELECT * FROM users")
  res.json({message: "hello there2", data: rows})
})

app.listen(3000, () => {
  console.log("Server working on : http://localhost:3000")
})