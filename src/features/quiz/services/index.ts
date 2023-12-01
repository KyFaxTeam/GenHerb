import { BaseService } from "../../../abstracts/service.base";
import config from "../../../config";
import { Quiz } from "../entities";


export class QuizService extends BaseService<Quiz> {

    public constructor() {
        super("quiz", Quiz);
    }

    /**
     * 
     * @param {string} rubric 
     * @param {number} limit
     * @return {Promise}
    */

    public async getQuiz(rubric:string): Promise<any> {

        const result = await this.repository
            .createQueryBuilder("quiz").select(["quiz.id", "quiz.question", "quiz.answer", "quiz.otheranswers"])
            .where("quiz.rubric = :rubric", {rubric: rubric })
            .orderBy("RANDOM()")
            .take(config.limitQuiz).getMany();

        return result ;
    }
    
    /**
     * I select a distinct value in column 'rubric'
     * @returns 
     */
    public async getAllRubrics() {
        const result = await this.repository.createQueryBuilder("quiz")
            .select("DISTINCT(quiz.rubric)").getRawMany();

        return result.map(result => result.rubric);
    }

}