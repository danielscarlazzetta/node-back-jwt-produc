"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_models_1 = __importDefault(require("./models/server.models"));
//Configuramos dotenv
dotenv_1.default.config();
const server = new server_models_1.default();
