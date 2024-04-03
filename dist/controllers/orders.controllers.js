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
class OrdersController {
    constructor() {
        this.orderOpen = 'open';
        this.orderClosed = 'closed';
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { rate_id, discount, table_number, people_number, opened } = req.body;
                if (!discount)
                    discount = 0;
                if (!people_number)
                    people_number = 1;
                const { rows } = yield db_1.default.query('INSERT INTO orders (status, opened, rate_id, discount, table_number, people_number) VALUES ($1, $6, $2, $3, $4, $5) returning *', ['open', rate_id, discount, table_number, people_number, opened]);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield db_1.default.query('SELECT * FROM orders');
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    getOneOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { rows } = yield db_1.default.query('SELECT * FROM orders WHERE id = $1', [id]);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { rate_id, discount, table_number, people_number, id } = req.body;
                if (!discount)
                    discount = 0;
                if (!people_number)
                    people_number = 1;
                const { rows } = yield db_1.default.query('UPDATE orders SET rate_id = $1, discount = $2, table_number = $3, people_number = $4 WHERE id = $5 RETURNING *', [rate_id, discount, table_number, people_number, id]);
                res.json(rows);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    closeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, closed, duration, rate_id, discount, table_number, people_number, order_cost } = req.body;
                const { rows } = yield db_1.default.query(`
        UPDATE orders SET status = 'closed',
            closed = $1, 
            duration = $2, 
            rate_id = $3, 
            discount = $4, 
            table_number = $5,
            people_number = $6,
            order_cost = $7 WHERE id = $8 RETURNING *`, [closed, duration, rate_id, discount, table_number, people_number, order_cost, id]);
                res.json(rows[0]);
            }
            catch (e) {
                console.log(e);
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const { rows } = yield db_1.default.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
                res.json(rows[0]);
            }
            catch (e) {
                res.json(new db_errors_1.default(e.code, e.detail));
            }
        });
    }
}
exports.default = new OrdersController();
