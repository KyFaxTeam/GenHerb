"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerPostStatsEventScheme = exports.getStatsWithIdScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getStatsWithIdScheme = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.string().required().description("Id of User")
    })
};
// export const playerGetOwnStats = {
//     query : Joi.object().keys({
//         pseudo: Joi.string().required().description("Player Pseudo")
//     })
// };
exports.playerPostStatsEventScheme = {
    body: joi_1.default.object().keys({
        // userId: Joi.string().required().description("User played Id"),
        score: joi_1.default.number().default(0),
        correctAnswers: joi_1.default.number().required(),
        incorrectAnswers: joi_1.default.number().required(),
        scoresByQuiz: joi_1.default.object({
            date: joi_1.default.date().iso().default(() => new Date()),
            quizId: joi_1.default.number().integer().required(),
            score: joi_1.default.number().integer().required(),
        }).required(),
        timeToPlay: joi_1.default.number().required(),
    })
};
