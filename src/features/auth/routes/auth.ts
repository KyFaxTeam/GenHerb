import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { AuthController } from "../controllers";


/**
 * I am a route for the auth feature
 *
 * I am responsible for initializing the quiz auth's routes
 *
 *
 * @extends BaseRoute
 */

export default class AuthRoute extends BaseRoute {

    public constructor(app: express.Application) {
        super(app, "/geh/api/v1/auth", new AuthController());

        this.route.post('/register', this.controller.register); 
        this.route.post('/login', this.controller.login)
        this.route.post('/forgot-password', this.validator, this.controller.forgotPassword)
        this.route.post('/reset-password', this.validator, this.controller.resetPassword)
        this.route.post('/refresh-token', this.validator, this.controller.refreshToken)
        this.route.post('/logout', this.validator, this.controller.logout)
       
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}