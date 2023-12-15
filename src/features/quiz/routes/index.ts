import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import QuizController from "../controllers";
import { getQuestionnaireScheme } from "../validations";
import { verifyOwnership, authenticateUser } from "../../../middlewares/auth";

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
        super(app, "/geh/api/v1/quiz", new QuizController());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: 'getQuizForSinglePlayer' handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(getQuestionnaireScheme), [authenticateUser] as any, [verifyOwnership] as any, this.controller.getQuizForSinglePlayer);

        /**
         * Route to retrieve all distinct rubrics.
         * Controller method: 'getAllRubrics' handles the logic for fetching all distinct rubrics.
         */
        this.route.get("/allThematics", [authenticateUser] as any, [verifyOwnership] as any, this.controller.getAllRubrics);
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}