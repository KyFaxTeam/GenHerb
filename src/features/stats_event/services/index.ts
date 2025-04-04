import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";

import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";

import { StatsEvent } from "../entities";



export class StatsEventService extends BaseService<StatsEvent> {

    private repo = dbSource.getRepository(StatsEvent);
    public constructor() {
        super("Stats Event", StatsEvent); 
    }

    public async getStatsWithEventId(id: number): Promise<any> {
      
        const result = await this.repo.createQueryBuilder("statsEvent")
            .select(["statsEvent.score", "statsEvent.correctAnswers", "statsEvent.incorrectAnswers", "statsEvent.pseudo","statsEvent.timeToPlay", "statsEvent.createdAt"])
            .where("statsEvent.eventId = :id", {id : id})
            .orderBy("statsEvent.score", "DESC")
            .getMany();
            
        if (!result ) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `This ${id} not found`});
        }
        return result; 
        
    }

    public async getOwnStats(pseudo: string): Promise<any> {
      
        const result = await this.repo.createQueryBuilder("statsEvent")
            .select(["statsEvent.score", "statsEvent.correctAnswers", "statsEvent.incorrectAnswers", "statsEvent.pseudo","statsEvent.timeToPlay", "statsEvent.response", "statsEvent.createdAt"])
            .where("statsEvent.pseudo = :pseudo", {pseudo : pseudo})
            .getMany();
            
        if (!result ) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `This ${pseudo} not found`});
        }
        return result; 
        
    }

    public async postStatsEvent(pseudo: string, data: object): Promise<any> {
        const isExist = await this.repo.createQueryBuilder("statsEvent")
            .where("statsEvent.pseudo = :pseudo", {pseudo : pseudo}).getMany();
        
        if (isExist) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `This ${pseudo} has already play this event`});
        }
        const entity = this.repo.create(data) ;
        await this.repo.save(entity);
        return ;
    }
} 