"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.EventService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_base_1 = require("../../../abstracts/service.base");
const data_source_1 = require("../../../config/data.source");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const entities_1 = require("../entities");
const dotenv = __importStar(require("dotenv"));
const config_1 = __importDefault(require("../../../config"));
dotenv.config();
class EventService extends service_base_1.BaseService {
    // private repoStatistic = dbSource.getRepository(StatisticsForEvents);
    constructor() {
        super("events", entities_1.Event);
        this.repo = data_source_1.dbSource.getRepository(entities_1.Event);
    }
    /**
     * Retrieve active or expired events based on the 'isActive' parameter.
     * @param isActive - If 1, retrieve active events; if 0, retrieve expired events.
     * @returns A Promise that resolves to an array of events.
     */
    // * 1 - 
    getEventsByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the current date and time.
            const currentDate = new Date();
            // Use a conditional statement to determine the WHERE clause based on 'isActive'.
            const whereQuery = status === "past"
                ? "events.expireAt < :currentDate"
                : status === "active"
                    ? "events.createdAt < :currentDate and events.expireAt > :currentDate"
                    : "events.createdAt > :currentDate";
            const result = yield this.repo.createQueryBuilder("events")
                .select(["events.id", "events.name", "events.image", "events.numberOfQuestions", "events.details", "events.createdAt", "events.expireAt"])
                .where(whereQuery, { currentDate: currentDate })
                .limit(config_1.default.limitQuiz)
                .getMany(); // Execute the query and retrieve the result as an array of events.
            // 
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.BAD_REQUEST, message: "Events not found" });
            }
            return result;
        });
    }
    // * 2 - 
    getEventStartToPlay(id, pseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the current date and time.
            const currentDate = new Date();
            const result = yield this.repo.createQueryBuilder("events")
                .where("events.createdAt < :currentDate and events.expireAt > :currentDate", { currentDate: currentDate })
                .andWhere("id = :id", { id: id })
                .getOne();
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `Events with ID ${id} not found` });
            }
            return result;
        });
    }
    // * 3 - 
    getEventWithId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.findBy({ id: id });
            if (!result) {
                throw new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: `Events with ID ${id} not found` });
            }
            return result;
        });
    }
}
exports.EventService = EventService;
// insert into quiz(question, answer, thematic, "subThematic", level, points, times) 
// values ('Quel film a remporté l''Oscar du meilleur film en 2019 ? ',
// '{"Green Book"}', 'Cinema', 'Oscar', 'Normal', 3, 10)
