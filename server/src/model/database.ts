import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})
pool.getConnection((err: any, con: any): void => {
    if (err) console.log(err)
    console.log(`Connection is ${con ? "Succesfuly !" : "Faild !"}`)
})
export default pool.promise()