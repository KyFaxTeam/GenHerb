"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint, splat, printf, colorize, uncolorize } = winston_1.format;
const config_1 = __importDefault(require("../config"));
const logger = (0, winston_1.createLogger)({
    // level: config.env === "development" ? "debug" : "info",
    format: combine(splat(), timestamp(), prettyPrint(), config_1.default.env === "development" ? colorize() : uncolorize(), printf(({ level, message, timestamp }) => `${level === "error" ? "🔴" : "🟢"} ${timestamp} :: ${level} :: ${message}`)),
    transports: [
        config_1.default.env === "development" ? new winston_1.transports.Console() :
            new winston_1.transports.File({ filename: `${config_1.default.logDirectory}/error.log` })
    ],
});
// try {
//     logger.info("Message de test");
//     console.log("Logger success");
// } catch (error) {
//     console.log(error)
// }
exports.default = logger;
