"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = exports.AuthRoute = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.AuthRoute = auth_1.default;
const user_1 = __importDefault(require("./user"));
exports.UserRoute = user_1.default;
