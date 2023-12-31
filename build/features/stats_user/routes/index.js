"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const validations_1 = require("../validations");
const controllers_1 = __importDefault(require("../controllers"));
const auth_1 = require("../../../middlewares/auth");
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
        // admin 
        this.route.get("/ranking", [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.getRanking);
        this.route.get("/total-quizzes-completed", [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.getOwnTotalQuizCompleted);
        this.route.delete("/:userId", [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.deleteStatsUser);
        // this.route.get("/quiz-stats/:quizId", [authenticateUser as any], [verifyOwnership as any], [requiredRole('admin')] as any, this.controller.getQuizStats);
        this.route.get("", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.getOwnStats);
        this.route.get("/:userId", this.validator(validations_1.getStatsWithIdScheme), [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.getStatsWithUserId);
        this.route.post("", this.validator(validations_1.playerPostStatsEventScheme), [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.postStatsUser);
        this.route.put("", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.updateStats);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = StatsUserRoute;
