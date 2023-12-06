import BaseFeature from "../../abstracts/features.base";
import StatsEventRoute from "./routes";
export default class StatsEventFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "Stats_Event", "Stats Event Features");
        this.route = new StatsEventRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
