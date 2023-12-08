"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../utils/validate"));
class BaseRoute {
    constructor(app, path, controller) {
        // - The express Router
        this.route = (0, express_1.Router)();
        this.app = app,
            this.path = path;
        this.controller = controller,
            this.validator = validate_1.default;
    }
}
exports.default = BaseRoute;
