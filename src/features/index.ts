import * as express from "express";
import BaseFeature from "../abstracts/features.base";
import QuizFeature from "./quiz";
import EventFeature from "./events";
import { AuthFeature, UserFeature } from "./auth";
import StatsEventFeature from "./stats_event";
import StatsUserFeature from "./stats_user";

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
    public app: express.Application;
    /** Business features container */
    public featuresLists: BaseFeature[] = [];
  
    constructor(app: express.Application) {
        this.app = app;
        this.featuresLists.push(new QuizFeature(this.app));
        this.featuresLists.push(new EventFeature(this.app));
        this.featuresLists.push(new StatsEventFeature(this.app));
        this.featuresLists.push(new StatsUserFeature(this.app));
        this.featuresLists.push(new UserFeature(this.app));
        this.featuresLists.push(new AuthFeature(this.app));
        

    }
  
    /**
     * Initialize all features
     *
     * @returns void
     */
    public init() {
        this.featuresLists.forEach((e: BaseFeature) => e.init());
    }
}