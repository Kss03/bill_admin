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
const db_1 = __importDefault(require("../db/db"));
const db_errors_1 = __importDefault(require("../errors/db.errors"));
class CategoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const { rows } = yield db_1.default.query(`INSERT INTO product_category (name) VALUES ($1) RETURNING *`, [name]);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield db_1.default.query(`SELECT * FROM product_category`);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getOneCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { rows } = yield db_1.default.query(`SELECT * FROM product_category WHERE id = $1`, [id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name } = req.body;
                const { rows } = yield db_1.default.query(`UPDATE product_category SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const { rows } = yield db_1.default.query('DELETE FROM product_category WHERE id = $1 RETURNING *', [id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
}
exports.default = new CategoryController();
