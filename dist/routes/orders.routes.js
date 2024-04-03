"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = __importDefault(require("../controllers/orders.controllers"));
const router = (0, express_1.Router)();
router.post('/order', orders_controllers_1.default.createOrder);
router.get('/order', orders_controllers_1.default.getAllOrders);
router.get('/order/:id', orders_controllers_1.default.getOneOrder);
router.put('/order', orders_controllers_1.default.updateOrder);
router.put('/order/close', orders_controllers_1.default.closeOrder);
router.delete('/order', orders_controllers_1.default.deleteOrder);
exports.default = router;
