import BaseFeature from "../../abstracts/features.base";
import StatsUserRoute from "./routes";
export default class StatsUserFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "Stats User", "Stats User Features");
        this.route = new StatsUserRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
