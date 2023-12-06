import BaseController from "../../../abstracts/controller.base";
import config from "../../../config";
import { successResponseFormat } from "../../../utils/success.response.send";
import { QuizService } from "../services";
export default class QuizController extends BaseController {
    constructor() {
        super(new QuizService());
    }
    // Function to retrieve a limit quiz questions of thmatic from the database  
    // TODO:  I need to use the previously written pick function work
    getQuizForSinglePlayer = this.catchAsync(async (req, res) => {
        const { thematic } = req.query;
        const result = await this.service.getQuiz(thematic);
        // TODO: format your return result
        res.send(successResponseFormat({ thematic: thematic, numberOfQuestions: config.limitQuiz, quiz: result }));
    });
    getAllRubrics = this.catchAsync(async (req, res) => {
        const result = await this.service.getAllRubrics();
        res.send(successResponseFormat(result));
    });
}
