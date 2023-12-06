import BaseController from "../../../abstracts/controller.base";
import { successResponseFormat } from "../../../utils/success.response.send";
import { StatsUserService } from "../services";
import { Request, Response } from "express";

export default class StatsUserController extends BaseController {
    public constructor() {
        super(new StatsUserService());
    }


    // Function to retrieve a limit quiz questions of thmatic from the database  
    // TODO:  I need to use the previously written pick function work
    public get = this.catchAsync(async (req: Request, res: Response) => {
    
    });

}

