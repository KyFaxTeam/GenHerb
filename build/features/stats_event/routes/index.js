import BaseRoute from "../../../abstracts/route.base";
import { getStatsWithIdScheme, playerGetOwnStats, playerPostStatsEventScheme } from "../validations";
import StatsEventController from "../controllers";
/**
 * I am a route for the quiz feature
 *
 * I am responsible for initializing the quiz feature's routes
 *
 *
 * @extends BaseRoute
 */
export default class StatsEventRoute extends BaseRoute {
    constructor(app) {
        super(app, "/geh/api/v1/stats_event", new StatsEventController());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: 'getQuizForSinglePlayer' handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(getStatsWithIdScheme), this.controller.getStatWithEventId);
        // Player post his stats after he was played
        this.route.post("", this.validator(playerPostStatsEventScheme), this.controller.postStats);
        // 
        this.route.get("/my_stats", this.validator(playerGetOwnStats), this.controller.getOwnStats);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
