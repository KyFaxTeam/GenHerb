import { NextFunction, Request, Response } from "express";
import pick from "./pick";
import Joi from "joi";
import ApiError from "./apiError";
import httpStatus from "http-status";
import config from "../config";
import logger from "./logger";


const MAX_RETRIES = config.MaxRetries;
const RETRY_DELAY = config.RetryDelay; 

const validateRequest = (schema: object | null, retries = 0) => async (req: Request, res: Response, next: NextFunction) => {
    // console.log('Validate request start ');


    if (config.dbIsReady) {
    
        logger.info("The database is Ready");

        if (schema) {
            validationSchema(schema, req, res, next)
        } else {
            logger.info("You're not sent schema ")
            return next();
        }

    } else if (retries < MAX_RETRIES) {

        logger.info("The database is NOT Ready. Retrying...");

        setTimeout(() => {
            validateRequest(schema, retries + 1)(req, res, next);
        }, RETRY_DELAY);

    } else {
        logger.info("Maximum retries reached. Launching error.");
        return next(new ApiError({ status: 400, message: "Database is not ready" }));
    }
};

const validationSchema = (schema: object, req: Request, res: Response, next: NextFunction) => {

    const validSchema = pick(schema, ["params", "query", "body"]);

        const object = pick(req, Object.keys(validSchema));

        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: "key" } })
            .validate(object);

        if (error) {
            return next(new ApiError({ status: httpStatus.BAD_REQUEST, message: error.message }));
        }

        Object.assign(req, value);
        // console.log('Validate request successfully ');
        return next();
}

export default validateRequest;