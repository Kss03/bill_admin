"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = __importDefault(require("../controllers/orders.controllers"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post('/orders', auth_middleware_1.default, orders_controllers_1.default.createOrder);
router.post('/orders/order-product', auth_middleware_1.default, orders_controllers_1.default.addProductToOrder);
router.get('/orders/order-product/:id', auth_middleware_1.default, orders_controllers_1.default.getOrderedProducts);
router.get('/orders', auth_middleware_1.default, orders_controllers_1.default.getAllOrders);
router.get('/orders/:id', auth_middleware_1.default, orders_controllers_1.default.getOneOrder);
router.put('/orders', auth_middleware_1.default, orders_controllers_1.default.updateOrder);
router.put('/orders/close', auth_middleware_1.default, orders_controllers_1.default.closeOrder);
router.delete('/orders', auth_middleware_1.default, orders_controllers_1.default.deleteOrder);
exports.default = router;
