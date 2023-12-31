"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.AuthService = void 0;
// services/index.ts
const auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_service_1.AuthService; } });
const user_service_1 = require("./user.service");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return user_service_1.UserService; } });
