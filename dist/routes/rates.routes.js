"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rates_controllers_1 = __importDefault(require("../controllers/rates.controllers"));
const router = (0, express_1.Router)();
router.post('/rates', rates_controllers_1.default.createRate);
router.get('/rates', rates_controllers_1.default.getAllRates);
router.get('/rates/:id', rates_controllers_1.default.getOneRate);
router.put('/rates', rates_controllers_1.default.updateRate);
router.delete('/rates', rates_controllers_1.default.deleteRate);
exports.default = router;
