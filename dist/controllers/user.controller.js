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
exports.deleteUser = exports.updateUser = exports.getIdUsers = exports.loginUser = exports.getAllUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email, phone, address, typeofuser } = req.body;
    const user = yield user_models_1.User.findOne({ where: { username: username } });
    const mail = yield user_models_1.User.findOne({ where: { email: email } });
    const hone = yield user_models_1.User.findOne({ where: { phone: phone } });
    const fieldsToValidate = [
        { value: name, fieldName: 'nombre' },
        { value: username, fieldName: 'username' },
        { value: address, fieldName: 'dirección' }
    ];
    for (const field of fieldsToValidate) {
        if (!validator_1.default.isAlphanumeric(field.value)) {
            return res.status(400).json({
                msg: `El ${field.fieldName} debe contener solo letras y números`,
            });
        }
    }
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
    if (!validator_1.default.isAlphanumeric(username)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    ;
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
        }, process.env.SECRET_KEY || '634kjbOHs99hSSDkn', { expiresIn: '10000000' }); //10000
        res.json({ token });
    }
    catch (error) {
        res.json({
            msg: `error`
        });
    }
});
exports.loginUser = loginUser;
const getIdUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }
        res.json(user);
    }
    catch (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({
            msg: `Error al obtener el usuario`,
            err,
        });
    }
});
exports.getIdUsers = getIdUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, username, password, email, phone, address, typeofuser } = req.body;
    if (!validator_1.default.isAlphanumeric(name)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    ;
    if (!validator_1.default.isAlphanumeric(username)) {
        return res.status(400).json({
            msg: `El username debe contener solo letras y números`,
        });
    }
    ;
    if (!validator_1.default.isAlphanumeric(address)) {
        return res.status(400).json({
            msg: `La direccion debe contener solo letras y números`,
        });
    }
    ;
    try {
        const user = yield user_models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }
        yield user.update({
            name: name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            typeofuser: typeofuser
        });
        res.json({
            msg: `Usuario ${username} actualizado con éxito`,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Error al actualizar el usuario`,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_models_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: `Usuario no encontrado`,
            });
        }
        yield user.destroy();
        res.json({
            msg: `Usuario eliminado con éxito`,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Error al eliminar el usuario`,
        });
    }
});
exports.deleteUser = deleteUser;
