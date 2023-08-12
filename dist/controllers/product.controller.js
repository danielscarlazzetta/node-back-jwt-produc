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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = exports.getProduct = void 0;
const product_models_1 = require("../models/product.models");
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
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, amount, category } = req.body;
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
