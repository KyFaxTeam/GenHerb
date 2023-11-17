import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { UserController } from "../controllers";


/**
 * I am a route for the user feature
 *
 * I am responsible for initializing the  user's routes
 *
 *
 * @extends BaseRoute
 */

export default class UserRoute extends BaseRoute {

    public constructor(app: express.Application) {
        super(app, "/geh/api/v1/users", new UserController());

        this.route.get("/:userId", this.validator, this.controller.getUserById);
        this.route.put(":/userId", this.validator, this.controller.updateUser)
       
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}