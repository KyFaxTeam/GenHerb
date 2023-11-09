import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import QuizController from "../controllers";
import { getQuestionnaireScheme } from "../validations";

/**
 * I am a route for the quiz feature
 *
 * I am responsible for initializing the quiz feature's routes
 *
 *
 * @extends BaseRoute
 */

export default class QuizRoute extends BaseRoute {

    public constructor(app: express.Application) {
        super(app, '/v1/quiz', new QuizController())

        this.route.get('', this.validator(getQuestionnaireScheme), this.controller.getQuizForSinglePlayer)
    }

    public init(): void {
        this.app.use(this.path, this.route)
    }
}