import { Request, Response, NextFunction } from "express";

export const catchAsync = <T = Request>(fn : (req : T , res: Response, next : NextFunction) 
=> Promise<any>) => (req : T, res: Response, next : NextFunction)  => {
    Promise.resolve(fn(req , res, next )).catch(error =>  next(error));
};
