import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";
import { Event } from "../entities";
import * as dotenv from "dotenv";
import config from "../../../config";


dotenv.config();

export class EventService extends BaseService<Event> {
    private repo = dbSource.getRepository(Event);
    // private repoStatistic = dbSource.getRepository(StatisticsForEvents);
    public constructor() {super("events", Event);}


    /**
     * Retrieve active or expired events based on the 'isActive' parameter.
     * @param isActive - If 1, retrieve active events; if 0, retrieve expired events.
     * @returns A Promise that resolves to an array of events.
     */
    // * 1 - 
    public async getEventsByStatus(status: string): Promise<any> {
        // Get the current date and time.
        const currentDate = new Date() ;
        // Use a conditional statement to determine the WHERE clause based on 'isActive'.

        const whereQuery = 
            status === "past" 
                ? "events.expireAt < :currentDate" 
                : status === "active" 
                    ? "events.createdAt < :currentDate and events.expireAt > :currentDate" 
                    : "events.createdAt > :currentDate" ;
        
        const result  = await this.repo.createQueryBuilder("events")
            .select(["events.id", "events.name", "events.image", "events.numberOfQuestions", "events.details", "events.createdAt", "events.expireAt"])
            .where(whereQuery, {currentDate : currentDate})
            .limit(config.limitQuiz)
            .getMany() ; // Execute the query and retrieve the result as an array of events.
        // 
        if (!result) {
            throw new ApiError({status : httpStatus.BAD_REQUEST, message: "Events not found"});
        }
        
        return result ;
    }
    
    // * 2 - 
    public async getEventStartToPlay(id: string, pseudo: string): Promise<any> {
        
        // Get the current date and time.
        const currentDate = new Date() ;

        const result = await this.repo.createQueryBuilder("events")
            .where("events.createdAt < :currentDate and events.expireAt > :currentDate" , {currentDate : currentDate})
            .andWhere("id = :id",{id : id})
            .getOne() ;

        if (!result) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `Events with ID ${id} not found`});
        }
        return result; 
    }

    // * 3 - 
    public async getEventWithId(id: number): Promise<any> {
        const result = await this.repo.findBy({id : id}) ;

        if (!result) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `Events with ID ${id} not found`});
        }
        return result; 
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    // * 4 - 
    // public async getStatistic(id:string): Promise<any> {
    //     const result = await this.repoStatistic.createQueryBuilder("statisticsForEvents")
    //         .select(["statisticsForEvents.score", "statisticsForEvents.correctAnswers", "statisticsForEvents.incorrectAnswers", "statisticsForEvents.playerPseudo","statisticsForEvents.timeToPlay", "statisticsForEvents.createdAt"])
    //         .where("statisticsForEvents.eventId = :id", {id : id})
    //         .orderBy("statisticsForEvents.score", "DESC")
    //         .getMany();
        
    //     if (!result ) {
    //         throw new ApiError({status : httpStatus.NOT_FOUND, message: `This ${id} not found`});
    //     }
    //     return result; 
    // }

    /**
     * 
     * @param pseudo 
     * @returns 
     */
    // * 5 - 
    // public async getUserResponse(pseudo: string): Promise<any> {

    //     const result = await this.repoStatistic.createQueryBuilder("statisticsForEvents")
    //         .select(["statisticsForEvents.response", "statisticsForEvents.correctAnswers", "statisticsForEvents.incorrectAnswers", "statisticsForEvents.timeToPlay", "statisticsForEvents.createdAt"])
    //         .where("statisticsForEvents.playerPseudo = :pseudo", {pseudo : pseudo}).getOne();
    
    //     if (!result) {
    //         throw new ApiError({status : httpStatus.NOT_FOUND, message: `This ${pseudo} not found for this event`});
    //     }
    //     return result; 
    // }

    /**
     * 
     * @param data 
     * @returns 
     */
    // * 6 - 
    // public async postUserResponse(data : object): Promise<any> {
    //     const entity = this.repoStatistic.create(data) ;
    //     await this.repoStatistic.save(entity);
    //     return ;
    // }
}

// insert into quiz(question, answer, thematic, "subThematic", level, points, times) 
// values ('Quel film a remporté l''Oscar du meilleur film en 2019 ? ',
// '{"Green Book"}', 'Cinema', 'Oscar', 'Normal', 3, 10)