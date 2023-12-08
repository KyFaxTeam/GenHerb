import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import EventController from "../controllers";
import { getActiveEventScheme,
    EventWithIdScheme,
    getStatisticScheme, getUserResponseScheme, postUserResponseScheme } from "../validations";   

import { verifyOwnership, authenticateUser } from "../../../middlewares/auth";

/**
 * I am a route for the events feature
 *
 * I am responsible for initializing the events feature's routes
 *
 *
 * @extends BaseRoute
 */

// TODO: We must add more and utils routes 
export default class ArticleRoute extends BaseRoute {
    public constructor(app:express.Application) {
        super(app, "/geh/api/v1/events", new EventController());


        // * 1 - GET request to retrieve active or expired events.
        this.route.get("/status/:status", this.validator(getActiveEventScheme), [authenticateUser] as any, [verifyOwnership] as any, this.controller.eventByStatus);
        
        // * 2 - GET request to retrieve quiz of a event
        this.route.get("/start", this.validator(EventWithIdScheme), [authenticateUser] as any, [verifyOwnership] as any, this.controller.eventStartToPlay);

        // * 3 - GET request to retrieve one event with his id
        this.route.get("", this.validator(EventWithIdScheme), [authenticateUser] as any, [verifyOwnership] as any, this.controller.eventWithId);
        
        // * 4 - GET request to retrieve static one specific event 
        // this.route.get("/statistic", this.validator(getStatisticScheme), this.controller.statistic);
        
        // * 5 - GET request to retrieve a player's response
        // this.route.get("/user-response", this.validator(getUserResponseScheme), this.controller.userResponse);
        
        // * 6 -POST 
        // this.route.post("/user-post", this.validator(postUserResponseScheme), this.controller.postUserResponse);
    }

    public init() { 
        this.app.use(this.path, this.route);
    }
}