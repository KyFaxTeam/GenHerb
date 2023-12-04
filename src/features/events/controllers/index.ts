import { EventService } from "../services";
import BaseController from "../../../abstracts/controller.base";
import { Request, Response } from "express";
import { successResponseFormat } from "../../../utils/success.response.send";

export default class EventController extends BaseController {
    
    constructor() {super(new EventService()); }

    /**
     * Controller method to handle the request for retrieving active or expired events.
     * @param req - Express Request object.
     * @param res - Express Response object.
     * @returns A Promise representing the asynchronous operation.
     */
    public eventByStatus = this.catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            // Extract the 'isActive' parameter from the request parameters.
            const { status } = req.params;

            // Call the service method to get active or expired events based on the 'status' parameter.
            const result = await this.service.getEventsByStatus(status);

            // Send the result as the response.
            res.send(successResponseFormat(result));
        }
    );
    
    // * 2 - 
    public eventStartToPlay= this.catchAsync(
        async(req: Request, res: Response) => {
            const {id} = req.query ;
            const result = await this.service.getEventStartToPlay(id) ;

            // Send the result as the response.
            res.send(successResponseFormat(result));
        });
    
    // * 3 - 
    public eventWithId = this.catchAsync(
        async(req: Request, res: Response) => {
            // Extract the 'id' parameter from the request
            const {id} = req.query ;
            const result = await this.service.getEventWithId(id);

            // Send the result as the response.
            res.send(successResponseFormat(result));
        }
    );

    // * 4 - 
    // public statistic = this.catchAsync(
    //     async(req: Request, res: Response) => {
    //         const {id} = req.query ;
    //         const result = await this.service.getStatistic(id);

    //         // Send the result as the response.
    //         res.send(successResponseFormat(result));
    //     });

    // * 5 - 
    // public userResponse = this.catchAsync(
    //     async(req: Request, res: Response) => {
    //         const {pseudo} = req.query ;
    //         const result = await this.service.getUserResponse(pseudo);

    //         // Send the result as the response.
    //         res.send(successResponseFormat(result));
    //     }
    // );
    
    // * 6 - 
    // public postUserResponse = this.catchAsync(
    //     async(req: Request, res: Response) => {
    //         const data = req.body;
    //         await this.service.postUserResponse(data);

    //         res.send(successResponseFormat({message : "Successful Register"}));
    //     }
    // );

}