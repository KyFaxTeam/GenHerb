"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const controllers_1 = __importDefault(require("../controllers"));
const validations_1 = require("../validations");
/**
 * I am a route for the events feature
 *
 * I am responsible for initializing the events feature's routes
 *
 *
 * @extends BaseRoute
 */
// TODO: We must add more and utils routes 
class ArticleRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/events", new controllers_1.default());
        // * 1 - GET request to retrieve active or expired events.
        this.route.get("/status/:status", this.validator(validations_1.getActiveEventScheme), this.controller.eventByStatus);
        // * 2 - GET request to retrieve quiz of a event
        this.route.get("/start", this.validator(validations_1.EventWithIdScheme), this.controller.eventStartToPlay);
        // * 3 - GET request to retrieve one event with his id
        this.route.get("", this.validator(validations_1.EventWithIdScheme), this.controller.eventWithId);
        // * 4 - GET request to retrieve static one specific event 
        // this.route.get("/statistic", this.validator(getStatisticScheme), this.controller.statistic);
        // * 5 - GET request to retrieve a player's response
        // this.route.get("/user-response", this.validator(getUserResponseScheme), this.controller.userResponse);
        // * 6 -POST 
        // this.route.post("/user-post", this.validator(postUserResponseScheme), this.controller.postUserResponse);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = ArticleRoute;
