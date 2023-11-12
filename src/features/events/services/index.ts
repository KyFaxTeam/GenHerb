import { BaseService } from "../../../abstracts/service.base";
import { dbSource } from "../../../config/data.source";
import { Events } from "../entities";
import * as dotenv from "dotenv";

dotenv.config();

export class EventService extends BaseService {
    private repo = dbSource.getRepository(Events);
    constructor() {super("events", Events);}

    public async getActiveEvent(isActive: number): Promise<any> {
        const currentDate = new Date() ;
        const result  = await this.repo.createQueryBuilder("events")
            .where("events.expireAt < :currentDate", {currentDate}).getMany() ;
        
        return result ;
    }

    public async getEventWithId(id: number): Promise<any> {
        return; 
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