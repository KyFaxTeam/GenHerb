import BaseFeature from "../../abstracts/features.base";
import { AuthRoute, UserRoute } from "./routes";
export class AuthFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "Auth", "Auth Connection");
        this.route = new AuthRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
export class UserFeature extends BaseFeature {
    route;
    constructor(app) {
        super(app, "User", "User Connection");
        this.route = new UserRoute(this.app);
    }
    init() {
        this.route.init();
    }
}
