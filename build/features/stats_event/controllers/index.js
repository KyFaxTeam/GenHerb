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
class StatsEventController extends controller_base_1.default {
    constructor() {
        super(new services_1.StatsEventService());
        this.getStatWithEventId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const result = yield this.service.getStatsWithEventId(id);
            // Send the result as the response. getOwnStats
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
        this.getOwnStats = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pseudo } = req.query;
            const result = yield this.service.getOwnStats(pseudo);
            // Send the result as the response. getOwnStats
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
        this.postStats = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield this.service.postStatsEvent(data);
        }));
    }
}
exports.default = StatsEventController;
