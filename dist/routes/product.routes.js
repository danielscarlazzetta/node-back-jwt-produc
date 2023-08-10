"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.getProduct);
router.post('/create', product_controller_1.newProduct);
exports.default = router;
