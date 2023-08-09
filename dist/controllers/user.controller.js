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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email, phone, address, typeofuser } = req.body;
    const user = yield user_models_1.User.findOne({ where: { username: username } });
    const mail = yield user_models_1.User.findOne({ where: { email: email } });
    const hone = yield user_models_1.User.findOne({ where: { phone: phone } });
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const existingFields = [];
    try {
        if (user || mail || hone) {
            if (user)
                existingFields.push(`El usuario ${username}`);
            if (mail)
                existingFields.push(`El email ${email}`);
            if (hone)
                existingFields.push(`El teléfono ${phone}`);
        }
        ;
        yield user_models_1.User.create({
            name: name,
            username: username,
            password: hashPassword,
            email: email,
            phone: phone,
            address: address,
            typeofuser: typeofuser,
        });
        res.json({
            msg: `Usuario  ${username} creado con exito!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `${existingFields.join(', ')} ya existe`
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => {
    //console.log(req.body);
    res.json({
        msg: 'Login User',
        body: req.body
    });
};
exports.loginUser = loginUser;
