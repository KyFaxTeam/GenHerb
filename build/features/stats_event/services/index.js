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
exports.StatsEventService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_base_1 = require("../../../abstracts/service.base");
const data_source_1 = require("../../../config/data.source");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const entities_1 = require("../entities");
class StatsEventService extends service_base_1.BaseService {
    constructor() {
        super("quiz", entities_1.StatsEvent);
        this.repo = data_source_1.dbSource.getRepository(entities_1.StatsEvent);
    }
    getStatsWithEventId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.createQueryBuilder("statsEvent")
                .select(["statsEvent.score", "statsEvent.correctAnswers", "statsEvent.incorrectAnswers", "statsEvent.pseudo", "statsEvent.timeToPlay", "statsEvent.createdAt"])
                .where("statsEvent.eventId = :id", { id: id })
                .orderBy("statsEvent.score", "DESC")
                .getMany();
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This ${id} not found` });
            }
            return result;
        });
    }
    getOwnStats(pseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.createQueryBuilder("statsEvent")
                .select(["statsEvent.score", "statsEvent.correctAnswers", "statsEvent.incorrectAnswers", "statsEvent.pseudo", "statsEvent.timeToPlay", "statsEvent.response", "statsEvent.createdAt"])
                .where("statsEvent.pseudo = :pseudo", { pseudo: pseudo })
                .getMany();
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This ${pseudo} not found` });
            }
            return result;
        });
    }
    postStatsEvent(pseudo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.repo.createQueryBuilder("statsEvent")
                .where("statsEvent.pseudo = :pseudo", { pseudo: pseudo }).getMany();
            if (isExist) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `This ${pseudo} has already play this event` });
            }
            const entity = this.repo.create(data);
            yield this.repo.save(entity);
            return;
        });
    }
}
exports.StatsEventService = StatsEventService;
