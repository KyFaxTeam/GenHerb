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
exports.logRequest = exports.verifyOwnership = exports.requiredRole = exports.authenticateUser = void 0;
const apiError_1 = __importDefault(require("../utils/apiError"));
const authTokenGenerator_1 = require("../features/auth/utils/authTokenGenerator");
const services_1 = require("../features/auth/services");
// import { verifyHash } from "../features/auth/utils/encryptionUtils";
const authenticateUser = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, authTokenGenerator_1.getTokenFromHeader)(req);
    // console.log("req.path : ",req.path)
    if (!token) {
        // console.log("Token is missing.");
        const error = new apiError_1.default({ status: 403, message: 'Token is missing' });
        return next(error);
    }
    let userId;
    if (req.path.endsWith("/refresh-token")) {
        userId = (0, authTokenGenerator_1.returnvalidateUser)(token, true);
        // console.log("********************userId: Endswith *****************************: ", userId)
    }
    else {
        userId = (0, authTokenGenerator_1.returnvalidateUser)(token);
        // console.log("********************userId *****************************: ", userId)
    }
    if (!userId) {
        // console.log("Invalid token.");
        const error = new apiError_1.default({ status: 403, message: 'Invalid token' });
        return next(error);
    }
    const service = new services_1.UserService();
    const user = yield service.getUserById(userId);
    if (!user) {
        // console.log("User not found.");
        const error = new apiError_1.default({ status: 403, message: 'User not found' });
        return next(error);
    }
    req.user = user;
    req.token = token;
    // console.log("Authentication successful.");
    next();
});
exports.authenticateUser = authenticateUser;
const requiredRole = (role) => {
    return (req, _res, next) => {
        const userRoles = req.user.roles;
        if (userRoles === role) {
            next();
        }
        else {
            const error = new apiError_1.default({ status: 403, message: "Unauthorized" });
            next(error);
        }
    };
};
exports.requiredRole = requiredRole;
const verifyOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = req.user.token;
    if (!userToken) {
        const error = new apiError_1.default({ status: 403, message: 'Invalid User token' });
        return next(error);
    }
    // console.log("req.token : ",req.token)
    // console.log("userToken : ", userToken)
    // const isToken = await verifyHash(req.token, userToken)
    const isToken = req.token === userToken;
    // console.log("Is Valid Token : ", isToken)
    // Vérifie si l'utilisateur est le propriétaire du compte
    if (isToken) {
        next();
    }
    else {
        const error = new apiError_1.default({ status: 403, message: 'Unauthorized Action' });
        next(error);
    }
});
exports.verifyOwnership = verifyOwnership;
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
exports.logRequest = logRequest;
