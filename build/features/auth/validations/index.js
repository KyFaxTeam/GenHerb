"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailTokenValidator = exports.deleteUsersValidator = exports.validId = exports.resetPasswordValisator = exports.forgotPasswordValidator = exports.loginValidator = exports.registrationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const allowedRoles = ["user", "admin", "moderator", "editor", "guest"];
exports.registrationValidator = {
    body: joi_1.default.object({
        pseudo: joi_1.default.string().required().min(2).max(20).messages({
            "string.min": "Password must be at least {{#limit}} characters long.",
            "string.max": "Password must be at most {{#limit}} characters long.",
            "any.required": "Username is required."
        }),
        email: joi_1.default.string().trim().email().required().messages({
            "string.email": "Email address must be in a valid format.",
            "any.required": "Email address is required.",
        }),
        password: joi_1.default.string().required().min(6).max(20).messages({
            "string.min": "Password must be at least {{#limit}} characters long.",
            "string.max": "Password must be at most {{#limit}} characters long.",
            "any.required": "Password is required.",
        }),
        repeat_password: joi_1.default.string().valid(joi_1.default.ref("password")).required().messages({
            "any.only": "Passwords must match.",
            "any.required": "Password confirmation is required.",
        }),
        roles: joi_1.default.string().valid(...allowedRoles).messages({
            "any.only": "Roles value is not appropriate"
        }),
        avatar: joi_1.default.string(),
        country: joi_1.default.string().required().messages({
            'any.required': 'Country is required.',
        }),
        age: joi_1.default.number().required().min(5).max(120).messages({
            'string.min': 'Age must be at least {{#limit}} characters long.',
            'string.max': 'Age must be at most {{#limit}} characters long.',
            'any.required': 'Age is required.',
        }),
    }),
};
exports.loginValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().trim().email().required().messages({
            "string.email": "Email address must be in a valid format.",
            "any.required": "Email address is required.",
        }),
        password: joi_1.default.string().required().messages({
            "any.required": "Password is required.",
        }),
    })
};
exports.forgotPasswordValidator = {
    body: joi_1.default.object({
        email: joi_1.default.string().trim().email().required().messages({
            "string.email": "Email address must be in a valid format.",
            "any.required": "Email address is required.",
        }),
    })
};
exports.resetPasswordValisator = {
    params: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
    query: joi_1.default.object({
        new_password: joi_1.default.string().required().min(6).max(20).messages({
            "string.min": "Password must be at least {{#limit}} characters long.",
            "string.max": "Password must be at most {{#limit}} characters long.",
            "any.required": "Password is required.",
        }),
    })
};
exports.validId = {
    params: joi_1.default.object({
        id: joi_1.default.number().required(),
    })
};
exports.deleteUsersValidator = {
    body: joi_1.default.object({
        userIds: joi_1.default.array().items(joi_1.default.number()).required().min(1).messages({
            "array.base": "User IDs must be an array of numbers.",
            "array.min": "At least one user ID is required for deletion.",
        }),
    }),
};
exports.verifyEmailTokenValidator = joi_1.default.object({
    token: joi_1.default.string().required()
});
