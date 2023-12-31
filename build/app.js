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
// import { dynamicAuthMiddleware } from "./middlewares/match";
class App {
    constructor() {
        // - Express App initialize
        this.app = (0, express_1.default)();
        // - Middlewares before features
        this.plugMiddlewareBeforeFeatures();
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataBaseIsReady();
                // Features instances
                this.features = new features_1.default(this.app);
                // Features initialize
                this.features.init();
                // Middlewares after features
                this.plugMiddlewareAfterFeatures();
            }
            catch (error) {
                console.error(error);
                throw new apiError_1.default({ status: 400, message: "Unable to initialize the application." });
            }
        });
    }
    dataBaseIsReady() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.dbSource.initialize()
                .then(() => logger_1.default.info("The database is connected."))
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch((_error) => {
                console.log(_error);
                logger_1.default.error("Unable to connect to the database: ${error}.");
            });
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
        // this.app.use(dynamicAuthMiddleware as any)
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
if (config_1.default.env === "development") {
    geh.listen();
}
else {
    // export const a = geh.app;
    logger_1.default.info("Server start on production");
    geh.listen();
    // console.log("Serveur start");
}
// export const app = geh.app;
