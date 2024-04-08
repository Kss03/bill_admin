"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post('/product', auth_middleware_1.default, products_controllers_1.default.createProduct);
router.get('/product', auth_middleware_1.default, products_controllers_1.default.getAllProducts);
router.get('/product/:id', auth_middleware_1.default, products_controllers_1.default.getOneProduct);
router.put('/product', auth_middleware_1.default, products_controllers_1.default.updateProduct);
router.delete('/product', auth_middleware_1.default, products_controllers_1.default.deleteProduct);
exports.default = router;
