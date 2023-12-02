"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("@/controller/auth/login.controller"));
const loginRoutes = express_1.default.Router();
loginRoutes.get("/", login_controller_1.default.login);
loginRoutes.get("/", login_controller_1.default.login);
exports.default = loginRoutes;
