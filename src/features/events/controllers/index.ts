import { EventService } from "../services";
import BaseController from "../../../abstracts/controller.base";
import { Request, Response } from "express";

export default class EventController extends BaseController {
    
    constructor() {super(new EventService()); }

    /**
     * Controller method to handle the request for retrieving active or expired events.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @returns A Promise representing the asynchronous operation.
     */
    public getActiveEvent = this.catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            // Extract the 'isActive' parameter from the request parameters.
            const { isActive } = req.params;

            // Call the service method to get active or expired events based on the 'isActive' parameter.
            const result = await this.service.getActiveEvent(isActive);

            // Send the result as the response.
            res.send(result);
        }
    );

    public getEventWithId = this.catchAsync(
        async(req: Request, res: Response) => {
            // Extract the 'id' parameter from the request
            const {id} = req.query ;
            const result = await this.service.getEventWithId(id);

            // Send the result as the response.
            res.send(result);
        }
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