"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = __importDefault(require("../Errors/api.errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../db/db"));
const generateJwt = (login, role) => {
    const payload = {
        login: login,
        role: role,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};
class AuthController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(new api_errors_1.default(400, "Register Error"));
                }
                const { login, password } = req.body;
                const role = "ADMIN";
                const hashPassword = bcryptjs_1.default.hashSync(password, 7);
                const { rows } = yield db_1.default.query(`INSERT INTO users (login, password, role) VALUES ($1, $2, (SELECT id FROM role WHERE $3 = name)) RETURNING *`, [login, hashPassword, role]);
                const token = generateJwt(login, role);
                return res.status(200).json({ token });
            }
            catch (e) {
                next(api_errors_1.default.badRequest(e.message));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const { rows } = yield db_1.default.query(`SELECT login, password, name AS role_name FROM users, role
				WHERE login = $1 AND users.role = role.id;`, [login]);
                if (rows.length === 0) {
                    res.status(400).json({ message: "User with this name does not exist" });
                    return;
                }
                const user = rows[0];
                const validPassword = bcryptjs_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    res.status(400).json({ message: "wrong password" });
                    return;
                }
                if (user.role_name != "ADMIN") {
                    res.status(400).json({ message: "no access rights" });
                    return;
                }
                const token = generateJwt(user.login, user.role_name);
                res.status(200).json({ token, message: "success" });
                return;
            }
            catch (e) {
                console.log(e);
                res.json(api_errors_1.default.badRequest(e));
                return;
            }
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //если middleware проверил и норм, то просто обновляем токен у пользователя
            const token = generateJwt(req.user.login, req.user.role);
            return res.json({ token });
        });
    }
}
exports.default = new AuthController();
