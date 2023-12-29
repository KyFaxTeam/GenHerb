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
exports.QuizService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_base_1 = require("../../../abstracts/service.base");
const config_1 = __importDefault(require("../../../config"));
const data_source_1 = require("../../../config/data.source");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const entities_1 = require("../entities");
class QuizService extends service_base_1.BaseService {
    constructor() {
        super("quiz", entities_1.Quiz);
        this.repo = data_source_1.dbSource.getRepository(entities_1.Quiz);
    }
    /**
     *
     * @param {string} thematic
     * @param {number} limit
     * @return {Promise}
    */
    getQuiz(thematic) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = thematic == "Général"
                ? yield this.repo
                    .createQueryBuilder("quiz")
                    .select(["quiz.id", "quiz.question", "quiz.answer", "quiz.points", "quiz.times", "quiz.thematic", "subThematic"])
                    .orderBy("RANDOM()")
                    .take(config_1.default.limitQuiz).getMany()
                : yield this.repo
                    .createQueryBuilder("quiz")
                    .select(["quiz.id", "quiz.question", "quiz.answer", "quiz.points", "quiz.times", "quiz.thematic", "subThematic"])
                    .where("quiz.thematic = :thematic", { thematic: thematic })
                    .orderBy("RANDOM()")
                    .take(config_1.default.limitQuiz).getMany();
            // if thematic doesn't exist
            if (result.length == 0) {
                throw new apiError_1.default({ status: http_status_1.default.BAD_REQUEST, message: "This thematic doesn't exist" });
            }
            return result;
        });
    }
    /**
     * I select a distinct value in column 'thematic'
     * @returns
     */
    getAllRubrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.createQueryBuilder("quiz")
                .select("DISTINCT(quiz.thematic)").getRawMany();
            return result.map(result => result.thematic);
        });
    }
    getStatisticForPlayers() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateInfo() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.QuizService = QuizService;
