import BaseFeature from "../../abstracts/features.base";
import * as express from "express";
import QuizRoute from "./routes";

export default class QuizFeature extends BaseFeature {
    public route: QuizRoute;

    constructor(app: express.Application) {
        super(app, "Quiz", "Quiz Features"); 
        this.route = new QuizRoute(this.app);
    }

    public init(): void {
        this.route.init();
    }
}