import BaseFeature from "../../abstracts/features.base";
import QuizRoute from "./routes";
export default class QuizFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "Quiz", "Quiz Features");
        this.route = new QuizRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
