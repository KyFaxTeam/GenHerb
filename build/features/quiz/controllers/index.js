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
const controller_base_1 = __importDefault(require("../../../abstracts/controller.base"));
const config_1 = __importDefault(require("../../../config"));
const success_response_send_1 = require("../../../utils/success.response.send");
const services_1 = require("../services");
class QuizController extends controller_base_1.default {
    constructor() {
        super(new services_1.QuizService());
        // Function to retrieve a limit quiz questions of thmatic from the database  
        // TODO:  I need to use the previously written pick function work
        this.getQuizForSinglePlayer = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { thematic } = req.query;
            const result = yield this.service.getQuiz(thematic);
            // TODO: format your return result
            res.send((0, success_response_send_1.successResponseFormat)({ thematic: thematic, numberOfQuestions: config_1.default.limitQuiz, quiz: result }));
        }));
        this.getAllRubrics = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAllRubrics();
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
    }
}
exports.default = QuizController;
