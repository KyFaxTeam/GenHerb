import BaseFeature from "../../abstracts/features.base";
import * as express from "express";
import EventRoute from "./routes";

export default class EventFeature extends BaseFeature {
    public route: EventRoute;

    constructor(app: express.Application) {
        super(app, "Events", "Events Features"); 
        this.route = new EventRoute(this.app);
    }

    public init(): void {
        this.route.init();
    }
}