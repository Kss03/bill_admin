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
const db_errors_1 = __importDefault(require("../Errors/db.errors"));
class ProductsController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, category_id, quantity, price, barcode } = req.body;
                if (!quantity)
                    quantity = 0;
                const { rows } = yield db_1.default.query(`INSERT INTO product (name, category_id, quantity, price, barcode) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, category_id, quantity, price, barcode]);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield db_1.default.query(`SELECT product.id AS id, product.name AS name, barcode, category_id, quantity, price, product_category.name AS category_name FROM product, product_category WHERE product.category_id = product_category.id`);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { rows } = yield db_1.default.query(`SELECT * FROM product WHERE id = $1`, [id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, category_id, quantity, price } = req.body;
                const { rows } = yield db_1.default.query(`UPDATE product 
                SET name = $1, category_id = $2, quantity = $3, price = $4
               WHERE id = $5 RETURNING *`, [name, category_id, quantity, price, id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const { rows } = yield db_1.default.query('DELETE FROM product WHERE id = $1 RETURNING *', [id]);
                res.status(200).json(rows[0]);
            }
            catch (e) {
                res.status(400).json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
}
exports.default = new ProductsController();
