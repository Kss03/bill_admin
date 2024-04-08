"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ message: "User Not Authorized!" });
        }
        const token = req.headers.authorization.split(" ")[1]; // Bearer asdasdasdasd
        if (!token) {
            return res.status(400).json({ message: "User Not Authorized!!" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e.message);
    }
}
exports.default = default_1;
;
