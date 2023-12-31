import { NextFunction, Request, Response } from "express";
import pick from "./pick";
import Joi from "joi";
import ApiError from "./apiError";
import httpStatus from "http-status";
import config from "../config";


const valideRequest = (schema : object) => (req : Request, res: Response, next : NextFunction) => {    
    console.log('Validate request start ');

    console.log("The database is Ready");

    if (config.dbIsReady){
        const validSchema = pick(schema, ["params", "query", "body"]);
    
        const object = pick(req, Object.keys(validSchema));

        const {value, error} = Joi.compile(validSchema)
            .prefs({errors : {label:"key"}})
            .validate(object);

        if (error) {
            // throw error;
            return next(new ApiError({status : httpStatus.BAD_REQUEST, message : error.message}));
        }

        Object.assign(req, value);
        console.log('Validate request successfully ')
        return next();

    } else {
        console.log("The database is NOT Ready")
        console.log("Config.isReady ? : ", config.dbIsReady)
        throw new ApiError({status: 400, message: "Database is not ready"})
    }

    
};


export default valideRequest;