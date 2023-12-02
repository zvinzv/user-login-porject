"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("@/model/database"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("@/routes/auth/login"));
const sign_1 = __importDefault(require("@/routes/auth/sign"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
require("dotenv").config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/v1/login", login_1.default);
app.use("/api/v1/sign", sign_1.default);
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows, feilds] = yield database_1.default.query("SELECT * FROM users");
    res.json({ message: "hello there2", data: rows });
}));
app.listen(3000, () => {
    console.log("Server working on : http://localhost:3000");
});
