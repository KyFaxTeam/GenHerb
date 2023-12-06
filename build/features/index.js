import QuizFeature from "./quiz";
import EventFeature from "./events";
import { AuthFeature, UserFeature } from "./auth";
import StatsEventFeature from "./stats_event";
/**
 * I am the Features class.
 *
 * I contain all the business features of the application.
 *
 * I'm responsible for initializing all features by giving them the express application
 * and calling their init() method.
 */
export default class Features {
    /** The express application */
    app;
    /** Business features container */
    featuresLists = [];
    constructor(app) {
        this.app = app;
        this.featuresLists.push(new QuizFeature(this.app));
        this.featuresLists.push(new EventFeature(this.app));
        this.featuresLists.push(new StatsEventFeature(this.app));
        this.featuresLists.push(new UserFeature(this.app));
        this.featuresLists.push(new AuthFeature(this.app));
    }
    /**
     * Initialize all features
     *
     * @returns void
     */
    init() {
        this.featuresLists.forEach((e) => e.init());
    }
}
