import express, { Express, Request, NextFunction, Response } from "express";
// import { Express, Request, NextFunction, Response } from "express";
import Features from "./features";
import Config from "./config";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/apiError";
import httpStatus from "http-status";
import  bodyParser from "body-parser";
import helmet from "helmet";
import { dbSource } from "./config/data.source";
import logger from "./utils/logger";
// import { dynamicAuthMiddleware } from "./middlewares/match";

class App {
    // - Express app
    public app: express.Application ;

    private features: Features;
    constructor() {
        // - Express App initialize
        this.app  = express() ;

        // - Middlewares before features
        this.plugMiddlewareBeforeFeatures();

        // check state of database
        this.dataBaseIsReady();

        // - Features instanci
        this.features = new Features(this.app) ;
        // Features initialize
        this.features.init();

        // Middlewares after features
        this.plugMiddlewareAfterFeatures();
    }

    private dataBaseIsReady() {
        dbSource.initialize()
            .then(() => logger.info(
                "The database is connected."
            ))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_error) =>  { 
                console.log(_error);
                logger.error("Unable to connect to the database: ${error}.");});
    }

    public listen() {
        this.app.listen(Config.server.port, Config.server.host, 
            () => logger.info(`Serveur listen : http://${Config.server.host}:${Config.server.port}`)) ;
    }

    private plugMiddlewareBeforeFeatures() {
        this.app.use(express.urlencoded({ extended: true }));
        // - Json form accept
        this.app.use(bodyParser.json());
        // secure apps by setting HTTP response headers.
        this.app.use(helmet());

        // this.app.use(dynamicAuthMiddleware as any)
    }

    private plugMiddlewareAfterFeatures() {
        // - Configuration load
        this.app.use((_req: Request, _res: Response, next: NextFunction) => {
            next(new ApiError({status : httpStatus.NOT_FOUND, message : "Request doest not exist"}));
        });
        // - Converted Error 
        this.app.use(errorConverter); 
        // - Handler Error
        this.app.use(errorHandler);
    }
}

const geh = new App() ;
if(Config.env === "development") {
    geh.listen();
} else {
    // export const a = geh.app;
    console.log("Serveur start");
}

export const app = geh.app;

