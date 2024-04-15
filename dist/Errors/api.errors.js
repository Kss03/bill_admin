"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message) {
        super(); //вызов родительского конструктора
        // and assign recieved value
        this.status = status;
        this.message = message;
    }
    static badRequest(message) {
        //here we return the new object ApiError at first parameter is the status-code
        //second parameter is message
        return new ApiError(400, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static forbitten(message) {
        return new ApiError(403, message);
        // 403 - no access(нет доступа)
    }
}
exports.default = ApiError;
