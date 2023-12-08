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
class StatsUserRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/stats_user", new controllers_1.default());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: ... handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(validations_1.scheme), this.controller.get);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = StatsUserRoute;
