import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import config from "../../../config";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";

import { Quiz } from "../entities";


export class QuizService extends BaseService<Quiz> {

    public constructor() {
        super("quiz", Quiz);
    }

    /**
     * 
     * @param {string} thematic 
     * @param {number} limit
     * @return {Promise}
    */

    public async getQuiz(thematic:string): Promise<any> {

        const result = await this.repo
            .createQueryBuilder("quiz")
            .select(["quiz.id", "quiz.question", "quiz.answer", "quiz.otheranswers", "quiz.points", "quiz.times"])
            .where("quiz.thematic = :thematic", {thematic: thematic })
            .orderBy("RANDOM()")
            .take(config.limitQuiz).getMany(); 
        
        // if thematic doesn't exist
        if (result.length == 0) {
            throw new ApiError({status : httpStatus.BAD_REQUEST, message: "This thematic doesn't exist"});
        }

        return result ;
    }
    
    /**
     * I select a distinct value in column 'thematic'
     * @returns 
     */
    public async getAllRubrics() {
        const result = await this.repo.createQueryBuilder("quiz")
            .select("DISTINCT(quiz.thematic)").getRawMany();

        return result.map(result => result.thematic);
    }

    public async getStatisticForPlayers() {}

    public async updateInfo() {}
}