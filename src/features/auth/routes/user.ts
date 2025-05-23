import * as express from "express";
import BaseRoute from "../../../abstracts/route.base";
import { UserController } from "../controllers";
import { deleteUsersValidator, validId } from "../validations";
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

    public constructor(app: express.Application) {
        super(app, "/geh/api/v1/users", new UserController());

        // user ? : Si je veux utiliser verifyOwnership, je suis obligé de passer l'id à chaque fois ! Est-il important que je le fasse ?
        this.route.get("/profile", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, this.controller.getUser);
        this.route.put("/profile", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, this.controller.updateUser);
        this.route.delete("/profile/delete", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, this.controller.deleteUser);
        this.route.put("/profile/activate", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, this.controller.activateUser);
        this.route.put("/profile/deactivate", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, this.controller.deactivateUser);

        // admin
        this.route.get("/", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, [requiredRole('admin')] as any, this.controller.getAllUsers);
        this.route.get("/:userId", this.validator(null), [authenticateUser] as any, [verifyOwnership] as any, [requiredRole('admin')] as any, this.controller.getUserById);
        this.route.delete("/delete", this.validator(deleteUsersValidator), [authenticateUser] as any, [verifyOwnership] as any, [requiredRole('admin')] as any, this.controller.deleteUsers);

       
    }

    public init(): void {
        this.app.use(this.path, this.route);
    }
}