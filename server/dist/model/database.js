"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: "sql.freedb.tech",
    user: "freedb_zvinzv_dev",
    password: "TG?xX$32hAWAhu#",
    database: "freedb_imamAlHussain",
});
pool.getConnection((err, con) => {
    if (err)
        console.log(err);
    console.log(`Connection is ${con ? "Succesfuly !" : "Faild !"}`);
});
exports.default = pool.promise();
