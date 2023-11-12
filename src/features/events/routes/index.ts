import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import EventController from "../controllers";
import { getActiveEventScheme,
    getStatisticScheme, getUserResponseScheme } from "../validations";   

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

        this.route.get("/active/:isActive", this.validator(getActiveEventScheme), this.controller.getActiveEvent);
        this.route.get("", this.validator(getActiveEventScheme), this.controller.getActiveEvent);
        this.route.get("/statistic", this.validator(getStatisticScheme), this.controller.getStatistic);
        this.route.get("/user-reponse", this.validator(getUserResponseScheme), this.controller.getUserResponse);
        // this.route.get('/user-post', this.validator(get), this.controller.getUserResponse)
        // this.route.get('/statistic', this.validator(getStatisticScheme), this.controller.statistic)
    }

    public init() { 
        this.app.use(this.path, this.route);
    }
}