"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
//Admin autorization
router.post("/register", auth_controllers_1.default.registration);
router.post("/login", auth_controllers_1.default.login);
router.get("/check", auth_middleware_1.default, auth_controllers_1.default.check);
exports.default = router;
