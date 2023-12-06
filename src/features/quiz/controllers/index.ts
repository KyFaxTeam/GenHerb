import BaseController from "../../../abstracts/controller.base";
import config from "../../../config";
import { successResponseFormat } from "../../../utils/success.response.send";
import { QuizService } from "../services";
import { Request, Response } from "express";

export default class QuizController extends BaseController {
    public constructor() {
        super(new QuizService());
    }


    // Function to retrieve a limit quiz questions of thmatic from the database  
    // TODO:  I need to use the previously written pick function work
    public getQuizForSinglePlayer = this.catchAsync(async (req: Request, res: Response) => {
        const { thematic } = req.query ; 
        const result = await this.service.getQuiz(thematic as string) ;

        // TODO: format your return result
        res.send(successResponseFormat({thematic : thematic, numberOfQuestions: config.limitQuiz, quiz : result}));
    });

    public getAllRubrics = this.catchAsync(async(req: Request, res: Response) => {
        const result = await this.service.getAllRubrics();

        res.send(successResponseFormat(result));
    });
}

