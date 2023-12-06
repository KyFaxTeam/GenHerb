"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor({ status, message }) {
        super();
        this.status = status;
        this.message = message;
    }
    toObject() {
        return { status: this.status, message: this.message };
    }
}
exports.default = ApiError;
