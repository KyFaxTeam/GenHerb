"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const data_source_1 = require("../config/data.source");
class BaseService {
    constructor(table, entity) {
        this.repository = data_source_1.dbSource.getRepository(entity);
        this.table = table;
    }
}
exports.BaseService = BaseService;
