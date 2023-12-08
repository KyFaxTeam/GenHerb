"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionnaireScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getQuestionnaireScheme = {
    query: joi_1.default.object().keys({
        thematic: joi_1.default.string().required(),
        level: joi_1.default.string().default("Normal")
    }),
};
