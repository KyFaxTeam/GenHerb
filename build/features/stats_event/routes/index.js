"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const validations_1 = require("../validations");
const controllers_1 = __importDefault(require("../controllers"));
/**
 * I am a route for the quiz feature
 *
 * I am responsible for initializing the quiz feature's routes
 *
 *
 * @extends BaseRoute
 */
class StatsEventRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/stats_event", new controllers_1.default());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: 'getQuizForSinglePlayer' handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(validations_1.getStatsWithIdScheme), this.controller.getStatWithEventId);
        // Player post his stats after he was played
        this.route.post("", this.validator(validations_1.playerPostStatsEventScheme), this.controller.postStats);
        // 
        this.route.get("/my_stats", this.validator(validations_1.playerGetOwnStats), this.controller.getOwnStats);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = StatsEventRoute;
