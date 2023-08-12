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
exports.loginUser2 = exports.loginUser = exports.getAllUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield user_models_1.User.findAll();
    res.json(listUser);
});
exports.getAllUser = getAllUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userName = yield user_models_1.User.findOne({ where: { username: username } });
    try {
        if (!userName) {
            return res.status(400).json({
                msg: `no existe en la base de datos`,
            });
        }
        ;
        const passwordValid = yield bcrypt_1.default.compare(password, userName.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: `password incorrecto`,
            });
        }
        const token = jsonwebtoken_1.default.sign({
            username: username
        }, process.env.SECRET_KEY || '634kjbOHs99hSSDkn');
        res.json({ token });
    }
    catch (error) {
        res.json({
            msg: `error`
        });
    }
});
exports.loginUser = loginUser;
const loginUser2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userName = yield user_models_1.User.findOne({ where: { username: username } });
    const emailCorreo = yield user_models_1.User.findOne({ where: { email: email } });
    if (!userName || !emailCorreo) {
        return res.status(400).json({
            msg: `no existe en la base de datos`,
        });
    }
    ;
    const passwordValid = yield bcrypt_1.default.compare(password, userName.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `password incorrecto`,
        });
    }
});
exports.loginUser2 = loginUser2;
