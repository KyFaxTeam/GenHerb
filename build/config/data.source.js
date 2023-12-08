"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
exports.dbSource = new typeorm_1.DataSource({
    type: "postgres",
    username: config_1.default.dbConfig.username,
    password: config_1.default.dbConfig.password,
    host: config_1.default.dbConfig.host,
    port: Number(config_1.default.dbConfig.port),
    database: config_1.default.dbConfig.database,
    entities: config_1.default.dbConfig.entities,
    // logging: true,
    synchronize: true
});
