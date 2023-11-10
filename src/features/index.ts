import * as express from "express";
import BaseFeature from "../abstracts/features.base";
import QuizFeature from "./quiz";
import EventFeature from "./events";

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
    }
  
    /**
     * Initialize all features
     *
     * @returns void
     */
    public init() {
      this.featuresLists.forEach((e: BaseFeature) => e.init())
    }
  }