import BaseController from "../../../abstracts/controller.base";
import { QuizService } from "../services";
import { Request, Response } from "express";

export default class QuizController extends BaseController {
    public constructor() {
        super(new QuizService())
    }

    // Function to retrieve a limit quiz questions of rubric from the database  
    // TODO:  I need to use the previously written pick function work
    public getQuizForSinglePlayer = this.catchAsync(async (req: Request, res: Response) => {
        const { rubric } = req.query ; 
        const result = await this.service.getQuiz(rubric as string)

        // TODO: format your retuen result
        res.json({result})
    })
}

