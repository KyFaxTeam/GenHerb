import BaseController from "../../../abstracts/controller.base";
import { successResponseFormat } from "../../../utils/success.response.send";
import { StatsEventService } from "../services";
import { Request, Response } from "express";

export default class StatsEventController extends BaseController {
    public constructor() {
        super(new StatsEventService());
    }
    public getStatWithEventId = this.catchAsync(async (req: Request, res: Response) => {
        const {id} = req.query ;
        const result = await this.service.getStatsWithEventId(id);

        // Send the result as the response. getOwnStats
        res.send(successResponseFormat(result));
    });

    public getOwnStats = this.catchAsync(async (req: Request, res: Response) => {
        const {pseudo} = req.query ;
        const result = await this.service.getOwnStats(pseudo);

        // Send the result as the response. getOwnStats
        res.send(successResponseFormat(result));
    });

    public postStats  =  this.catchAsync(async (req: Request, res: Response) => {
        const data = req.body;
        await this.service.postStatsEvent(data) ;
    });
}

