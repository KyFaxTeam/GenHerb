import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";
import { Events } from "../entities";
import * as dotenv from "dotenv";


dotenv.config();

export class EventService extends BaseService<Events> {
    private repo = dbSource.getRepository(Events);
    constructor() {super("events", Events);}

    /**
     * Retrieve active or expired events based on the 'isActive' parameter.
     * @param isActive - If 1, retrieve active events; if 0, retrieve expired events.
     * @returns A Promise that resolves to an array of events.
     */
    public async getActiveEvent(isActive: number): Promise<any> {
        // Get the current date and time.
        const currentDate = new Date() ;
        // Use a conditional statement to determine the WHERE clause based on 'isActive'.
        
        const result  = await this.repo.createQueryBuilder("events")
            .where(isActive === 1 ? "events.expireAt > :currentDate" : "events.expireAt < :currentDate", {currentDate : currentDate})
            .getMany() ; // Execute the query and retrieve the result as an array of events.
        
        if (!result) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: "Events not found"});
        }
        return result ;
    }

    public async getEventWithId(id: string): Promise<any> {
        const result = await this.repo.findOne({where : {__id : id}}) ;

        if (!result) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `Events with ID ${id} not found`});
        }
        return result; 
    }

    public async getStatistic(): Promise<any> {
        return; 
    }

    public async getUserResponse(): Promise<any> {
        return ;
    }

    public async postUserResponse(): Promise<any> {
        return ;
    }
}