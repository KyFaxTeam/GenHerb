import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { scheme } from "../validations";
import StatsUserController from "../controllers";

/**
 * I am a route for the quiz feature
 *
 * I am responsible for initializing the quiz feature's routes
 *
 *
 * @extends BaseRoute
 */

export default class StatsUserRoute extends BaseRoute {

    public constructor(app: express.Application) {
        super(app, "/geh/api/v1/stats_user", new StatsUserController());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: ... handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(scheme), this.controller.get);

     
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}