"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = __importDefault(require("../controllers/category.controllers"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post('/category', auth_middleware_1.default, category_controllers_1.default.createCategory);
router.get('/category', auth_middleware_1.default, category_controllers_1.default.getAllCategories);
router.get('/category/:id', auth_middleware_1.default, category_controllers_1.default.getOneCategory);
router.put('/category', auth_middleware_1.default, category_controllers_1.default.updateCategory);
router.delete('/category', auth_middleware_1.default, category_controllers_1.default.deleteCategory);
exports.default = router;
