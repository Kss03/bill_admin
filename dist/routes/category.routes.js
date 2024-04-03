"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = __importDefault(require("../controllers/category.controllers"));
const router = (0, express_1.Router)();
router.post('/category', category_controllers_1.default.createCategory);
router.get('/category', category_controllers_1.default.getAllCategories);
router.get('/category/:id', category_controllers_1.default.getOneCategory);
router.put('/category', category_controllers_1.default.updateCategory);
router.delete('/category', category_controllers_1.default.deleteCategory);
exports.default = router;
