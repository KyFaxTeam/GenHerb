import BaseFeature from "../../abstracts/features.base";
import * as express from "express";
import StatsEventRoute from "./routes";

export default class StatsEventFeature extends BaseFeature {
    public route: StatsEventRoute;

    constructor(app: express.Application) {
        super(app, "Stats_Event", "Stats Event Features"); 
        this.route = new StatsEventRoute(this.app);
    }

    public init(): void {
        this.route.init();
    }
}