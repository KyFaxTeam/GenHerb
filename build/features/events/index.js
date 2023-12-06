import BaseFeature from "../../abstracts/features.base";
import EventRoute from "./routes";
export default class EventFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "Events", "Events Features");
        this.route = new EventRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
