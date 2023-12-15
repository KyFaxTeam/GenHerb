import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { getStatsWithIdScheme, playerPostStatsEventScheme } from "../validations";
import StatsUserController from "../controllers";
import { authenticateUser, requiredRole, verifyOwnership } from "../../../middlewares/auth";

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

        this.route.get("", [authenticateUser as any], [verifyOwnership as any], this.controller.getOwnStats);
        this.route.get("/:userId", this.validator(getStatsWithIdScheme), [authenticateUser as any], [verifyOwnership as any], this.controller.getStatsWithUserId);
        this.route.post("", this.validator(playerPostStatsEventScheme), [authenticateUser as any], [verifyOwnership as any], this.controller.postStatsUser);
        this.route.put("/:userId", [authenticateUser as any], [verifyOwnership as any], this.controller.updateStats);
        
        
        this.route.delete("/:userId", [authenticateUser as any], [verifyOwnership as any], [requiredRole('admin')] as any, this.controller.deleteStatsUser);
        this.route.get("/total-quizzes-completed", [authenticateUser as any], [verifyOwnership as any], [requiredRole('admin')] as any, this.controller.getOwnTotalQuizCompleted);
        this.route.get("/ranking", [authenticateUser as any], [verifyOwnership as any], [requiredRole('admin')] as any,  this.controller.getRanking);
        this.route.get("/quiz-stats/:quizId", [authenticateUser as any], [verifyOwnership as any], [requiredRole('admin')] as any, this.controller.getQuizStats);
     
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}