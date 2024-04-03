"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dbError extends Error {
    constructor(status, message) {
        super(); //вызов родительского конструктора
        // and assign recieved value
        this.status = status;
        this.message = message;
    }
    static error(status, message) {
        return new dbError(status, message);
    }
}
exports.default = dbError;
