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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsUserService = void 0;
const service_base_1 = require("../../../abstracts/service.base");
const data_source_1 = require("../../../config/data.source");
const entities_1 = require("../entities");
class StatsUserService extends service_base_1.BaseService {
    constructor() {
        super("Stats User", entities_1.StatsUser);
        this.repo = data_source_1.dbSource.getRepository(entities_1.StatsUser);
    }
    get(thematic) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.StatsUserService = StatsUserService;
