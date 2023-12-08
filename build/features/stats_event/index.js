"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_base_1 = __importDefault(require("../../abstracts/features.base"));
const routes_1 = __importDefault(require("./routes"));
class StatsEventFeature extends features_base_1.default {
    constructor(app) {
        super(app, "Stats_Event", "Stats Event Features");
        this.route = new routes_1.default(this.app);
    }
    init() {
        this.route.init();
    }
}
exports.default = StatsEventFeature;
