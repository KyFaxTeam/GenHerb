import BaseFeature from "../../abstracts/features.base";
import * as express from "express"
import { AuthRoute, UserRoute } from "./routes";

export class AuthFeature extends BaseFeature {
    public route: AuthRoute;

    constructor(app: express.Application){
        super(app, "Auth", "Auth Connection")

        this.route = new AuthRoute(this.app)
    }

    public init(): void {
        this.route.init()
    }
}

export class UserFeature extends BaseFeature {
    public route: UserRoute; 

    constructor(app: express.Application) {
        super(app, "User", "User Connection")

        this.route = new UserRoute(this.app)
    }

    public init(): void {
        this.route.init()
    }
}