import { EventService } from "../services";
import BaseController from "../../../abstracts/controller.base";
import { Request, Response } from "express";

export default class EventController extends BaseController {
    
    constructor() {super(new EventService()); }

    public getActiveEvent = this.catchAsync( 
        async(req: Request, res: Response) => {
            const {isActive}  = req.params ;
            const result = this.service.getActiveEvent(isActive);

            res.send(result);
        }
    );

    public getEventWithId = this.catchAsync(
        async(req: Request, res: Response) => {}
    );

    public getStatistic = this.catchAsync(
        async(req: Request, res: Response) => {}
    );

    public getUserResponse = this.catchAsync(
        async(req: Request, res: Response) => {}
    );

    public postUserResponse = this.catchAsync(
        async(req: Request, res: Response) => {}
    );

}