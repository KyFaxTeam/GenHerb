"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const apiError_1 = __importDefault(require("../utils/apiError"));
const httpStatus = __importStar(require("http-status"));
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * Convert any other error to ApiError
 *
 * This is a middleware that converts any error to ApiError.
 * @see app.ts for usage
 * @param {Error} err - Error
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {NextFunction} next - NextFunction
 * @returns {Function} - Express NextFunction
 */
const errorConverter = (err, req, res, next) => {
    let error = err;
    // throw error ;
    if (!(error instanceof apiError_1.default)) {
        error = new apiError_1.default({ status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message || "Unknown Error" });
    }
    next(error);
};
exports.errorConverter = errorConverter;
/**
   * Handle ApiError and send response
   *
   * This is a middleware that handles ApiError and sends the response.
   * @see app.ts for usage
   * @param {ApiError} err - ApiError
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   * @returns {Function} - Express NextFunction
   */
const errorHandler = (err, req, res, next) => {
    // throw err ;
    const { status, message } = err;
    res.status(status).send({ success: false, error: { status: status, message: message } });
    logger_1.default.error(`Status : ${status}, Message : ${message}`);
};
exports.errorHandler = errorHandler;
