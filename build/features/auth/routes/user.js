"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_base_1 = __importDefault(require("../../../abstracts/route.base"));
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
const auth_1 = require("../../../middlewares/auth");
/**
 * I am a route for the user feature
 *
 * I am responsible for initializing the  user's routes
 *
 *
 * @extends BaseRoute
 */
class UserRoute extends route_base_1.default {
    constructor(app) {
        super(app, "/geh/api/v1/users", new controllers_1.UserController());
        // user ? : Si je veux utiliser verifyOwnership, je suis obligé de passer l'id à chaque fois ! Est-il important que je le fasse ?
        this.route.get("/profile", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.getUser);
        this.route.put("/profile", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.updateUser);
        this.route.delete("/profile/delete", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.deleteUser);
        this.route.put("/profile/activate", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.activateUser);
        this.route.put("/profile/deactivate", [auth_1.authenticateUser], [auth_1.verifyOwnership], this.controller.deactivateUser);
        // admin
        this.route.get("/", [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.getAllUsers);
        this.route.get("/:userId", [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.getUserById);
        this.route.delete("/delete", this.validator(validations_1.deleteUsersValidator), [auth_1.authenticateUser], [auth_1.verifyOwnership], [(0, auth_1.requiredRole)('admin')], this.controller.deleteUsers);
    }
    init() {
        this.app.use(this.path, this.route);
    }
}
exports.default = UserRoute;
