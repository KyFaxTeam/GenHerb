"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const controllers_1 = require("../controllers");
const auth_1 = require("../../../middlewares/auth");
const validations_1 = require("../validations");
/**
 * I am a route for the auth feature
 *
 * I am responsible for initializing the quiz auth's routes
 *
 *
 * @extends BaseRoute
 */
class AuthRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/auth", new controllers_1.AuthController());
        this.route.post("/register", this.validator(validations_1.registrationValidator), this.controller.register);
        this.route.post("/login", this.validator(validations_1.loginValidator), this.controller.login);
        this.route.post("/forgot-password", this.validator(validations_1.forgotPasswordValidator), this.controller.forgotPassword);
        // route to verify reset password link
        this.route.get('/reset-password/:token', this.validator(validations_1.resetPasswordValisator), this.controller.resetPassword);
        this.route.post('/refresh-token', [auth_1.authenticateUser], this.controller.refreshToken);
        this.route.post('/logout/', [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.logout);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = AuthRoute;
