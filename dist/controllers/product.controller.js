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
exports.deleteProduct = exports.updateProduct = exports.getIdProduct = exports.getProduct = exports.newProduct = void 0;
const product_models_1 = require("../models/product.models");
const validator_1 = __importDefault(require("validator"));
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, amount, category } = req.body;
    if (!validator_1.default.isAlphanumeric(name)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    ;
    if (!validator_1.default.isAlphanumeric(description)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    try {
        const existingProduct = yield product_models_1.Product.findOne({ where: { name: name } });
        if (existingProduct) {
            return res.json(`${name} ya existe`);
        }
        yield product_models_1.Product.create({
            name: name,
            description: description,
            price: price,
            amount: amount,
            category: category
        });
        return res.json({
            msg: "Producto creado con éxito!",
        });
    }
    catch (err) {
        return res.status(400).json({
            msg: `Error`,
            err,
        });
    }
});
exports.newProduct = newProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield product_models_1.Product.findAll();
        res.json(listProducts);
    }
    catch (err) {
        res.status(400).json({
            msg: `${err}`,
        });
    }
});
exports.getProduct = getProduct;
const getIdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    console.log(productId);
    try {
        const product = yield product_models_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }
        res.json(product);
    }
    catch (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).json({
            msg: `Error al obtener el producto`,
            err,
        });
    }
});
exports.getIdProduct = getIdProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { name, description, price, amount, category } = req.body;
    if (!validator_1.default.isAlphanumeric(name)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    ;
    if (!validator_1.default.isAlphanumeric(description)) {
        return res.status(400).json({
            msg: `El nombre debe contener solo letras y números`,
        });
    }
    try {
        const product = yield product_models_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }
        yield product.update({
            name: name,
            description: description,
            price: price,
            amount: amount,
            category: category,
        });
        res.json({
            msg: `Producto ${name} actualizado con éxito`,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Error al actualizar el producto`,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield product_models_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                msg: `Producto no encontrado`,
            });
        }
        yield product.destroy();
        res.json({
            msg: `Producto eliminado con éxito`,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Error al eliminar el producto`,
        });
    }
});
exports.deleteProduct = deleteProduct;
