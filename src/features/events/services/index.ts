import { BaseService } from "../../../abstracts/service.base";
import { Event } from "../entities";
import * as dotenv from 'dotenv'

dotenv.config()

export class EventService extends BaseService {
    constructor() {
        super('events', Event)
    }

    public async getActiveEvent(): Promise<any> {
        return ;
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