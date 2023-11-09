import { BaseService } from "../../../abstracts/service.base";
import { Quiz } from "../entities";
import * as dotenv from 'dotenv'

dotenv.config()

export class QuizService extends BaseService {
    public constructor() {
        super("quiz", Quiz)
    }

    /**
     * 
     * @param {string} rubric 
     * @param {number} limit
     * @return {Promise}
    */

    public async getQuiz(rubric:string): Promise<any> {

        return this.repository
            .createQueryBuilder("quiz")
            .where('quiz.rubric = :rubric', { rubric })
            .orderBy('RANDOM()')
            .take(parseInt(process.env.LIMIT_QUIZ || '20'))
    }


}