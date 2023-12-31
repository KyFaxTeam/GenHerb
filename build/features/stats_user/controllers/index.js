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
const success_response_send_1 = require("../../../utils/success.response.send");
const services_1 = require("../services");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
// export default class StatsUserController extends BaseController {
//     public constructor() {
//         super(new StatsUserService());
//     }
//     // Function to retrieve a limit quiz questions of thmatic from the database  
//     // TODO:  I need to use the previously written pick function work
//     public get = this.catchAsync(async (req: Request, res: Response) => {
//     });
// }
class StatsUserController extends controller_base_1.default {
    constructor() {
        super(new services_1.StatsUserService());
        this.getStatsWithUserId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.userId);
            const result = yield this.service.getStatsWithUserId(id);
            // Send the result as the response. getOwnStats
            if (result) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(result));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'Stat not found.' }));
            }
        }));
        this.getOwnStats = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log("this.service : ", this.service)
            const result = yield this.service.getStatsWithUserId(req.user.id);
            // Send the result as the response. getOwnStats
            if (result) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(result));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'Stat not found.' }));
            }
        }));
        this.postStatsUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield this.service.postStatsUser(req.user.id, data);
            res.status(201).send((0, success_response_send_1.successResponseFormat)({ message: 'Stats posts successfully.' }));
        }));
        this.updateStats = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log("I'm here ***********")
            //   // const userId: number = parseInt(req.params.userId, 10);
            //   console.log("this.service : ", this.service)
            const updates = req.body;
            const updatedStats = yield this.service.updateStatsService(req.user.id, updates);
            if (updatedStats) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(updatedStats));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'Unable to update Stats.' }));
            }
        }));
        this.deleteStatsUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId, 10);
            yield this.service.deleteStatsUser(userId);
            res.status(204).send((0, success_response_send_1.successResponseFormat)({ message: 'Stats delete successfully.' }));
        }));
        this.getOwnTotalQuizCompleted = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('getOwnTotalQuizCompleted Controller');
            const totalQuizStats = yield this.service.getOwnTotalQuizCompleted(req.user.id);
            if (totalQuizStats) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(totalQuizStats));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'TotalQuiz not found.' }));
            }
        }));
        // admin 
        this.getRanking = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ranking = yield this.service.getRanking();
            if (ranking) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(ranking));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'Unable to get Ranking' }));
            }
            res.send((0, success_response_send_1.successResponseFormat)(ranking));
        }));
        this.getQuizStats = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const quizId = parseInt(req.params.quizId, 10);
            const quizStats = yield this.service.getQuizStats(quizId);
            if (quizStats) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(quizStats));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'quizStats not found.' }));
            }
        }));
    }
}
exports.default = StatsUserController;
