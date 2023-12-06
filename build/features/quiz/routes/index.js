"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const controllers_1 = __importDefault(require("../controllers"));
const validations_1 = require("../validations");
/**
 * I am a route for the quiz feature
 *
 * I am responsible for initializing the quiz feature's routes
 *
 *
 * @extends BaseRoute
 */
class QuizRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/quiz", new controllers_1.default());
        /**
         * Route to handle fetching a quiz for a single player.
         * Middleware: Validator to validate the request against the 'getQuestionnaireScheme'.
         * Controller method: 'getQuizForSinglePlayer' handles the logic for retrieving the quiz.
         */
        this.route.get("", this.validator(validations_1.getQuestionnaireScheme), this.controller.getQuizForSinglePlayer);
        /**
         * Route to retrieve all distinct rubrics.
         * Controller method: 'getAllRubrics' handles the logic for fetching all distinct rubrics.
         */
        this.route.get("/allThematics", this.controller.getAllRubrics);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = QuizRoute;
