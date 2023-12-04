import BaseFeature from "../../abstracts/features.base";
import * as express from "express";
import StatsUserRoute from "./routes";

export default class StatsUserFeature extends BaseFeature {
    public route: StatsUserRoute;

    constructor(app: express.Application) {
        super(app, "Stats User", "Stats User Features"); 
        this.route = new StatsUserRoute(this.app);
    }

    public init(): void {
        this.route.init();
    }
}