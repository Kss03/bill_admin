"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const router = (0, express_1.Router)();
router.post('/product', products_controllers_1.default.createProduct);
router.get('/product', products_controllers_1.default.getAllProducts);
router.get('/product/:id', products_controllers_1.default.getOneProduct);
router.put('/product', products_controllers_1.default.updateProduct);
router.delete('/product', products_controllers_1.default.deleteProduct);
exports.default = router;
