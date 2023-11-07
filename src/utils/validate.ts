import { NextFunction, Request, Response } from "express";
import pick from "./pick";
import Joi from "joi";
import ApiError from "./apiError";
import httpStatus from "http-status";


const valideRequest = (schema : Object) => (req : Request, res: Response, next : NextFunction) => {    
    let validShema = pick(schema, ["query", "params", "body"]);
    
    let object = pick(req, Object.keys(validShema)) ;

    const {value, error} = Joi.compile(validShema)
    .prefs({errors : {label:"key"}})
    .validate(object);

    if (error) {
       return next(new ApiError({status : httpStatus.BAD_REQUEST, message : error.message}))
    }

    Object.assign(req, value);
    return next()
}

export default valideRequest;