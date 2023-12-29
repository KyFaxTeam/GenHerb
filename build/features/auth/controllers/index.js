"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = void 0;
// services/index.ts
const auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return auth_controller_1.AuthController; } });
const user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "UserController", { enumerable: true, get: function () { return user_controller_1.UserController; } });
