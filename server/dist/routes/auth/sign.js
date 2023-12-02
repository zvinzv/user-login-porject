"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sign_controller_1 = __importDefault(require("@/controller/auth/sign.controller"));
const signRoutes = express_1.default.Router();
signRoutes.get("/", sign_controller_1.default.sign);
exports.default = signRoutes;
