import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { AuthController } from "../controllers";
import { authenticateUser, requiredRole, verifyOwnership } from "../../../middlewares/auth";
import { forgotPasswordValidator, 
         loginValidator, 
         resetPasswordValisator, 
         registrationValidator
        } from "../validations";



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

        this.route.post('/register', this.validator(registrationValidator), this.controller.register); 
        this.route.post('/login', this.validator(loginValidator), this.controller.login)
        this.route.post('/forgot-password', this.validator(forgotPasswordValidator), this.controller.forgotPassword)
        // route to verify reset password link
        this.route.get('/reset-password/:token', this.validator(resetPasswordValisator), this.controller.resetPassword)
        // this.route.post('/refresh-token', this.validator(), this.controller.refreshToken)
        // this.route.post('/logout', this.validator, [authenticateUser] as any, [verifyOwnership] as any, this.controller.logout)
       
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}