import {Request, Response, NextFunction, request } from "express";
import ApiError from "../utils/apiError";
import * as httpStatus from "http-status";
import logger from "../utils/logger";

/**
 * Convert any other error to ApiError
 *
 * This is a middleware that converts any error to ApiError.
 * @see app.ts for usage
 * @param {Error} err - Error
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {NextFunction} next - NextFunction
 * @returns {Function} - Express NextFunction
 */
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    // throw error ;
    if (!(error instanceof ApiError)) {
        error = new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message : error.message || "Unknown Error"});
    }
    next(error);
};
  
/**
   * Handle ApiError and send response
   *
   * This is a middleware that handles ApiError and sends the response.
   * @see app.ts for usage
   * @param {ApiError} err - ApiError
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - NextFunction
   * @returns {Function} - Express NextFunction
   */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // throw err ;
    const { status, message } = err;
    res.status(status).send({success : false,  error : {status : status, message : message}});
    logger.error(`Status : ${status}, Message : ${message}`);
};
  