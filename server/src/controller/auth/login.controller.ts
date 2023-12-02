import pool from "@/model/database"
import dotenv from 'dotenv';
dotenv.config()
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {Request, Response} from "express"
import { Error400, Error500 } from "@/model/Errors";
const secretJWT = process.env.secretJWT as string
const loginController = {
  login: async (req: Request, res:Response) => {
    try {
      //! Get Info User
      const [rows] = await pool.query<any>('SELECT * FROM `users` WHERE username = ? ', [req.body.username])
      //! Check Password
      let password = await bcrypt.compare(req.body.password, rows[0].password)
      //! Check Password be true
      if (!password) return res.status(400).json(Error400("Error Happen !", "Username or password error!"))
      //! Make Token For This User
      const token = jwt.sign(rows[0], secretJWT, {expiresIn: "24h"})
      //! Send Data
      res.status(200).json({data: rows[0], token})
    } catch (error) {
      //! Send Error
      res.status(500).json(Error500("Error Happen !", error))
    }
  },
  getInfoByToken: async (req: Request, res:Response) => {
    try {
      //! Get User Info By Token
      const jwts = jwt.verify(req.body.token, process.env.secretJWT as string, (err: unknown, user: unknown) => {if (err) return err; return user})
      //! Send Data
      res.status(200).json({jwts})
    } catch (error) {
      //! Send Error
      res.status(500).json(Error500("Error Happen !", error))
    }
  },
}
export default loginController