"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerPostStatsEventScheme = exports.playerGetOwnStats = exports.getStatsWithIdScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getStatsWithIdScheme = {
    query: joi_1.default.object().keys({
        id: joi_1.default.string().required().description("Id of Event")
    })
};
exports.playerGetOwnStats = {
    query: joi_1.default.object().keys({
        pseudo: joi_1.default.string().required().description("Player Pseudo")
    })
};
exports.playerPostStatsEventScheme = {
    body: joi_1.default.object().keys({
        eventId: joi_1.default.string().required().description("Event played Id"),
        pseudo: joi_1.default.string().required().description("player Pseudo"),
        score: joi_1.default.number().required(),
        correctAnswers: joi_1.default.number().required(),
        incorrectAnswers: joi_1.default.number().required(),
        response: joi_1.default.array().items(joi_1.default.object().keys({
            // Rubric info
            name: joi_1.default.string().required(),
            result: joi_1.default.array().items(joi_1.default.object().keys({
                questionId: joi_1.default.number().required().description("Number of question"),
                playerAnswer: joi_1.default.string().required(),
                isCorrect: joi_1.default.boolean().required(),
            }))
        })),
        timeToPlay: joi_1.default.number().required(),
        scoreBeforeEvent: joi_1.default.number().required(),
        scoreAfterEvent: joi_1.default.number().required(),
    })
};
