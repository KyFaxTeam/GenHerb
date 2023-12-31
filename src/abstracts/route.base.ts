import express, { Router } from "express";
import valideRequest from "../utils/validate";
import ApiError from "../utils/apiError";
import Config from "../config";

export default abstract class BaseRoute{

    // - The express App
    public app: express.Application ;
    // - The express Router
    public route = Router();
    // - The route path
    public path : string;
    // - The router controller
    public controller : any ;
    // validator
    public validator ;

    public constructor(app : express.Application, path: string, controller : any) {
        this.app = app,
        this.path = path;
        this.controller = controller;
        this.validator = valideRequest; 

    }

    

    /**
     * Initialize the router
     * @returns void
     */
    public abstract init() : void
}