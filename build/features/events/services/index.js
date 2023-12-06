import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";
import { Event } from "../entities";
import * as dotenv from "dotenv";
import config from "../../../config";
dotenv.config();
export class EventService extends BaseService {
    repo = dbSource.getRepository(Event);
    // private repoStatistic = dbSource.getRepository(StatisticsForEvents);
    constructor() { super("events", Event); }
    /**
     * Retrieve active or expired events based on the 'isActive' parameter.
     * @param isActive - If 1, retrieve active events; if 0, retrieve expired events.
     * @returns A Promise that resolves to an array of events.
     */
    // * 1 - 
    async getEventsByStatus(status) {
        // Get the current date and time.
        const currentDate = new Date();
        // Use a conditional statement to determine the WHERE clause based on 'isActive'.
        const whereQuery = status === "past"
            ? "events.expireAt < :currentDate"
            : status === "active"
                ? "events.createdAt < :currentDate and events.expireAt > :currentDate"
                : "events.createdAt > :currentDate";
        const result = await this.repo.createQueryBuilder("events")
            .select(["events.id", "events.name", "events.image", "events.numberOfQuestions", "events.details", "events.createdAt", "events.expireAt"])
            .where(whereQuery, { currentDate: currentDate })
            .limit(config.limitQuiz)
            .getMany(); // Execute the query and retrieve the result as an array of events.
        // 
        if (!result) {
            throw new ApiError({ status: httpStatus.BAD_REQUEST, message: "Events not found" });
        }
        return result;
    }
    // * 2 - 
    async getEventStartToPlay(id, pseudo) {
        // Get the current date and time.
        const currentDate = new Date();
        const result = await this.repo.createQueryBuilder("events")
            .where("events.createdAt < :currentDate and events.expireAt > :currentDate", { currentDate: currentDate })
            .andWhere("id = :id", { id: id })
            .getOne();
        if (!result) {
            throw new ApiError({ status: httpStatus.NOT_FOUND, message: `Events with ID ${id} not found` });
        }
        return result;
    }
    // * 3 - 
    async getEventWithId(id) {
        const result = await this.repo.findBy({ id: id });
        if (!result) {
            throw new ApiError({ status: httpStatus.NOT_FOUND, message: `Events with ID ${id} not found` });
        }
        return result;
    }
}
// insert into quiz(question, answer, thematic, "subThematic", level, points, times) 
// values ('Quel film a remporté l''Oscar du meilleur film en 2019 ? ',
// '{"Green Book"}', 'Cinema', 'Oscar', 'Normal', 3, 10)
