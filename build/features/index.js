"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_1 = __importDefault(require("./quiz"));
const events_1 = __importDefault(require("./events"));
const auth_1 = require("./auth");
const stats_event_1 = __importDefault(require("./stats_event"));
/**
 * I am the Features class.
 *
 * I contain all the business features of the application.
 *
 * I'm responsible for initializing all features by giving them the express application
 * and calling their init() method.
 */
class Features {
    constructor(app) {
        /** Business features container */
        this.featuresLists = [];
        this.app = app;
        this.featuresLists.push(new quiz_1.default(this.app));
        this.featuresLists.push(new events_1.default(this.app));
        this.featuresLists.push(new stats_event_1.default(this.app));
        this.featuresLists.push(new auth_1.UserFeature(this.app));
        this.featuresLists.push(new auth_1.AuthFeature(this.app));
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
exports.default = Features;
