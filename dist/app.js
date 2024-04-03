"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const rates_routes_1 = __importDefault(require("./routes/rates.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', orders_routes_1.default);
app.use('/api/v1', products_routes_1.default);
app.use('/api/v1', category_routes_1.default);
app.use('/api/v1', rates_routes_1.default);
app.use('/api/v1', auth_routes_1.default);
app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`));