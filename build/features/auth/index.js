"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFeature = exports.AuthFeature = void 0;
const features_base_1 = __importDefault(require("../../abstracts/features.base"));
const routes_1 = require("./routes");
class AuthFeature extends features_base_1.default {
    constructor(app) {
        super(app, "Auth", "Auth Connection");
        this.route = new routes_1.AuthRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
exports.AuthFeature = AuthFeature;
class UserFeature extends features_base_1.default {
    constructor(app) {
        super(app, "User", "User Connection");
        this.route = new routes_1.UserRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
exports.UserFeature = UserFeature;
