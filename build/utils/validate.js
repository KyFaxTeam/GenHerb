"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("./pick"));
const joi_1 = __importDefault(require("joi"));
const apiError_1 = __importDefault(require("./apiError"));
const http_status_1 = __importDefault(require("http-status"));
const valideRequest = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ["params", "query", "body"]);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);
    if (error) {
        // throw error;
        return next(new apiError_1.default({ status: http_status_1.default.BAD_REQUEST, message: error.message }));
    }
    Object.assign(req, value);
    return next();
};
exports.default = valideRequest;
