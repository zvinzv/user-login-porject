import pool from "@/model/database"
import User from "@/model/user"
import dotenv from 'dotenv';
dotenv.config()
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {Request, Response} from "express"
import { Error403, Error400, Error500 } from "@/model/Errors";
const bcryptMAIN = process.env.bcryptMAIN as number | string
const secretJWT = process.env.secretJWT as  string
const signController = {
  // todo; To Add New User `Gust`
  signNew: async (req: Request, res:Response) => {
    try {
      //! Hash Password
      const password = await bcrypt.hash(req.body.password, +bcryptMAIN)
      //! Create User
      await pool.query('INSERT INTO `users` (`id`, `username`, `password`, `img`, `role`, `update_time`, `create_time`) VALUES (NULL, ?, ?, ?, ?, NOW(), NOW())', [req.body.username, password, req.body.img || "", "guest"])
      //! Get User
      const [rows] = await pool.query<any>('SELECT * FROM `users` WHERE username = ?', [req.body.username])
      //! Create Token For This User
      let passwordCompare = await bcrypt.compare(req.body.password, rows[0].password)
      //! Cheack password be not false
      if (!passwordCompare) return res.status(400).json(Error400("Error Happen !", "Username or password error!"))
      //! Create Token For This User
      const token = jwt.sign(rows[0] as User, process.env.secretJWT as string, {expiresIn: "24h"})
      //! Send Data
      res.status(201).json({data: rows[0], token})
    } catch (error: any) {
      //! If Duplicated Send Error
      if (error.code === "ER_DUP_ENTRY") return res.status(403).json({errMessage: "Username was duplicated.", errDetails: error})
      //! Else Send Diffrent Error
      res.status(500).json({errMessage: "Error Happen.", errDetails: error})
    }
  },
  // todo; To Add New User `Admin` By 'Full' user
  signNewAdmin: async (req: Request, res:Response) => {
    try {
      //! Hash Password
      const password = await bcrypt.hash(req.body.password, +bcryptMAIN)
      //! if not has token `adminToken`
      if (!req.body.adminToken) return res.status(301).json(Error403("Access Denide !", "Token Invalide !"))
      //! Get Info Of Admin From `adminToken`
      let adminFullAccess: any = jwt.verify(req.body.adminToken, secretJWT, (err: any, user: any) => {if (err) return {err}; return user})
      //! Cheack Admin
      if (adminFullAccess.username !== "ZVINZV" && adminFullAccess.role !== "full") return res.status(301).json(Error403("Access Denide !", "User Invalide !"))
      //! Create User
      await pool.query('INSERT INTO `users` (`id`, `username`, `password`, `img`, `role`, `update_time`, `create_time`) VALUES (NULL, ?, ?, ?, ?, NOW(), NOW())', [req.body.username, password, req.body.img || "", "admin"])
      //! Get User
      const [rows] = await pool.query<any>('SELECT * FROM `users` WHERE username = ?', [req.body.username])
      //! Create Token For This User
      const token = jwt.sign(rows[0] as User, process.env.secretJWT as string, {expiresIn: "24h"})
      //! Send Data Of New User
      res.status(201).json({data: rows, token})
    } catch (error: any) {
      //! If Duplicated Send Error
      if (error.code === "ER_DUP_ENTRY") return res.status(400).json(Error400("Username was duplicated !", error))
      //! Else Send Diffrent Error
      res.status(500).json(Error500("Error Happen !", error))
    }
  }
}


export default signController