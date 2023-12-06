import BaseRoute from "../../../abstracts/route.base";
import { UserController } from "../controllers";
import { deleteUsersValidator } from "../validations";
import { authenticateUser, requiredRole, verifyOwnership } from "../../../middlewares/auth";
/**
 * I am a route for the user feature
 *
 * I am responsible for initializing the  user's routes
 *
 *
 * @extends BaseRoute
 */
export default class UserRoute extends BaseRoute {
    constructor(app) {
        super(app, "/geh/api/v1/users", new UserController());
        // user ? : Si je veux utiliser verifyOwnership, je suis obligé de passer l'id à chaque fois ! Est-il important que je le fasse ?
        this.route.get("/profile", [authenticateUser], [verifyOwnership], this.controller.getUser);
        this.route.put("/profile", [authenticateUser], [verifyOwnership], this.controller.updateUser);
        this.route.delete("/profile/delete", [authenticateUser], [verifyOwnership], this.controller.deleteUser);
        this.route.put("/profile/activate", [authenticateUser], [verifyOwnership], this.controller.activateUser);
        this.route.put("/profile/deactivate", [authenticateUser], [verifyOwnership], this.controller.deactivateUser);
        // admin
        this.route.get("/", [authenticateUser], [verifyOwnership], [requiredRole('admin')], this.controller.getAllUsers);
        this.route.get("/:userId", [authenticateUser], [verifyOwnership], [requiredRole('admin')], this.controller.getUserById);
        this.route.delete("/delete", this.validator(deleteUsersValidator), [authenticateUser], [verifyOwnership], [requiredRole('admin')], this.controller.deleteUsers);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
