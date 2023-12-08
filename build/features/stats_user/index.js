"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_base_1 = __importDefault(require("../../abstracts/features.base"));
const routes_1 = __importDefault(require("./routes"));
class StatsUserFeature extends features_base_1.default {
    constructor(app) {
        super(app, "Stats User", "Stats User Features");
        this.route = new routes_1.default(this.app);
    }
    init() {
        this.route.init();
    }
}
exports.default = StatsUserFeature;
