"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import { Express, Request, NextFunction, Response } from "express";
const features_1 = __importDefault(require("./features"));
const config_1 = __importDefault(require("./config"));
const error_1 = require("./middlewares/error");
const apiError_1 = __importDefault(require("./utils/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const data_source_1 = require("./config/data.source");
const logger_1 = __importDefault(require("./utils/logger"));
class App {
    constructor() {
        // - Express App initialize
        this.app = (0, express_1.default)();
        // - Middlewares before features
        this.plugMiddlewareBeforeFeatures();
        // check state of database
        this.dataBaseIsReady();
        // - Features instanci
        this.features = new features_1.default(this.app);
        // Features initialize
        this.features.init();
        // Middlewares after features
        this.plugMiddlewareAfterFeatures();
    }
    dataBaseIsReady() {
        data_source_1.dbSource.initialize()
            .then(() => logger_1.default.info("The database is connected."))
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_error) => {
            console.log(_error);
            logger_1.default.error("Unable to connect to the database: ${error}.");
        });
    }
    listen() {
        this.app.listen(config_1.default.server.port, config_1.default.server.host, () => logger_1.default.info(`Serveur listen : http://${config_1.default.server.host}:${config_1.default.server.port}`));
    }
    plugMiddlewareBeforeFeatures() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // - Json form accept
        this.app.use(body_parser_1.default.json());
        // secure apps by setting HTTP response headers.
        this.app.use((0, helmet_1.default)());
    }
    plugMiddlewareAfterFeatures() {
        // - Configuration load
        this.app.use((_req, _res, next) => {
            next(new apiError_1.default({ status: http_status_1.default.NOT_FOUND, message: "Request doest not exist" }));
        });
        // - Converted Error 
        this.app.use(error_1.errorConverter);
        // - Handler Error
        this.app.use(error_1.errorHandler);
    }
}
const geh = new App();
// if(Config.env === "development") {
//     app.listen();
// } else {
//     export const a = app.app;
//     console.log("Serveur start");
// }
exports.app = geh.app;
