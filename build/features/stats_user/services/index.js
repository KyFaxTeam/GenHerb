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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_base_1 = require("../../../abstracts/service.base");
const data_source_1 = require("../../../config/data.source");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const entities_1 = require("../entities");
// export class StatsUserService extends BaseService<StatsUser> {
//     private repo = dbSource.getRepository(StatsUser);
//     public constructor() {
//         super("Stats User", StatsUser);
//     }
//     public async get(thematic:string): Promise<any> {
//     }
// }
class StatsUserService extends service_base_1.BaseService {
    constructor() {
        super("Stats User", entities_1.StatsUser);
        this.repo = data_source_1.dbSource.getRepository(entities_1.StatsUser);
    }
    getStatsWithUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.createQueryBuilder("statsUser")
                // .select(["statsUser.pseudo","statsUser.score", "statsUser.correctAnswers", "statsUser.incorrectAnswers", "statsUser.scoresByQuiz","statsUser.timeToPlay", "statsUser.createdAt"])
                .where("statsUser.userId = :id", { id: id })
                .getOne();
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This id: ${id} not found` });
            }
            return result;
        });
    }
    postStatsUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExist = yield this.repo.createQueryBuilder("statsUser")
                    .where("statsUser.userId = :id", { id: id })
                    .getOne();
                // console.log(isExist)
                if (isExist) {
                    if (isExist instanceof entities_1.StatsUser) {
                        this.addStats(isExist, data);
                        return;
                    }
                    else {
                        throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This id: ${id} has already its stats` });
                    }
                }
                const scoresByQuiz = data.scoresByQuiz;
                // const adaptedScoresByQuiz: { [quizId: number]: { date: Date; score: number } }[] = [
                //     {
                //         [scoresByQuiz.quizId]: {
                //             date: new Date(scoresByQuiz.date),
                //             score: scoresByQuiz.score,
                //         },
                //     },
                // ];
                data.score = scoresByQuiz.score;
                data.scoresByQuiz = {};
                data.scoresByQuiz[scoresByQuiz.quizId] = {
                    date: new Date(scoresByQuiz.date),
                    score: scoresByQuiz.score,
                };
                const entity = this.repo.create(data);
                entity.userId = id;
                yield this.repo.save(entity);
                // console.log("Log finish")
                return;
            }
            catch (error) {
                throw new apiError_1.default({ status: http_status_1.default.INTERNAL_SERVER_ERROR, message: `Internal server error on poststats` });
            }
        });
    }
    addStats(isExist, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ('incorrectAnswers' in data) {
                    isExist.incorrectAnswers += data.incorrectAnswers;
                }
                if ('correctAnswers' in data) {
                    isExist.correctAnswers += data.correctAnswers;
                }
                if ('scoresByQuiz' in data) {
                    const scoresByQuiz = data.scoresByQuiz;
                    isExist.scoresByQuiz[scoresByQuiz.quizId] = {
                        date: new Date(scoresByQuiz.date),
                        score: scoresByQuiz.score,
                    };
                    if ('score' in data) {
                        // console.log("I'm here now")
                        isExist.score += scoresByQuiz.score;
                    }
                }
                if ('timeToPlay' in data) {
                    isExist.timeToPlay += data.timeToPlay;
                }
                yield this.repo.save(isExist);
            }
            catch (error) {
                throw new apiError_1.default({ status: http_status_1.default.INTERNAL_SERVER_ERROR, message: `AddStats Errors` });
            }
        });
    }
    // TODO : Il faudra s'assurer de dimunier le score aussi lorsqu'on modifie scoresByQuiz et particulièrement un score d'un quiz
    updateStatsService(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("I'm here ***********")
                const result = yield this.repo.createQueryBuilder("statsUser")
                    // .select(["statsUser.pseudo","statsUser.score", "statsUser.correctAnswers", "statsUser.incorrectAnswers", "statsUser.scoresByQuiz","statsUser.timeToPlay", "statsUser.createdAt"])
                    .where("statsUser.userId = :id", { id: id })
                    .getOne();
                if (!updates) {
                    throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `The updates object are not sent` });
                }
                if (!result) {
                    throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This id: ${id} not found` });
                }
                if ('scoresByQuiz' in updates) {
                    const { scoresByQuiz } = updates, updatesWithoutScoresByQuiz = __rest(updates, ["scoresByQuiz"]);
                    let quizId = 0;
                    if (typeof scoresByQuiz === 'object' && scoresByQuiz !== null && 'quizId' in scoresByQuiz) {
                        quizId = scoresByQuiz.quizId;
                    }
                    else {
                        throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `quizId not sent in scoresByQuiz` });
                    }
                    const keysArray = Object.keys(result.scoresByQuiz);
                    const quizIndex = keysArray.indexOf(quizId.toString());
                    if (quizIndex !== -1) {
                        const quizToUpdate = result.scoresByQuiz[quizIndex];
                        if ('date' in scoresByQuiz && scoresByQuiz.date instanceof Date) {
                            quizToUpdate.date = scoresByQuiz.date;
                        }
                        if ('score' in scoresByQuiz) {
                            quizToUpdate.score = scoresByQuiz.score;
                        }
                        // Mettre à jour l'élément dans l'array
                        result.scoresByQuiz[quizIndex] = quizToUpdate;
                        Object.assign(result, updatesWithoutScoresByQuiz);
                    }
                    else {
                        throw new apiError_1.default({ status: http_status_1.default.BAD_REQUEST, message: 'quizId not found.' });
                    }
                }
                else {
                    Object.assign(result, updates);
                }
                return result;
            }
            catch (error) {
                console.error(error);
                throw new apiError_1.default({ status: http_status_1.default.INTERNAL_SERVER_ERROR, message: `Update Errors` });
            }
        });
    }
    deleteStatsUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExist = yield this.repo.createQueryBuilder("statsUser")
                    .where("statsUser.userId = :id", { id: id })
                    .getOne();
                // console.log(isExist)
                if (!isExist) {
                    throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This id: ${id} not found ` });
                }
                yield this.repository.delete(isExist.id);
                return;
            }
            catch (error) {
                throw new apiError_1.default({ status: http_status_1.default.INTERNAL_SERVER_ERROR, message: `Internal server error on poststats` });
            }
        });
    }
    getOwnTotalQuizCompleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield this.repo.findOne({ where: { userId: id } });
            if (!stats) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This id: ${id} not found ` });
            }
            const keysArray = Object.keys(stats.scoresByQuiz);
            return { "total": keysArray.length, "scoresByQuiz": stats.scoresByQuiz };
        });
    }
    //   public async getOwnRanking(id:number): Promise<number> {
    //     const ranking = await this.repo.findOne({ where: { userId: id } });
    //     if (!ranking) {
    //         throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found `});
    //     }
    //     return ranking.score;
    //  }
    /////////////// Admin Functions
    getRanking() {
        return __awaiter(this, void 0, void 0, function* () {
            const ranking = yield this.repo.find({
                order: { score: 'DESC' },
                select: ['userId', 'score']
            });
            return ranking;
        });
    }
}
exports.StatsUserService = StatsUserService;
