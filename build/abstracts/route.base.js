import { Router } from "express";
import valideRequest from "../utils/validate";
export default class BaseRoute {
    // - The express App
    app;
    // - The express Router
    route = Router();
    // - The route path
    path;
    // - The router controller
    controller;
    // validator
    validator;
    constructor(app, path, controller) {
        this.app = app,
            this.path = path;
        this.controller = controller,
            this.validator = valideRequest;
    }
}
