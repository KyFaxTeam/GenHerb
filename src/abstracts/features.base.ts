import * as express from "express";

/**
 * This is a base config for all features
 */

export default abstract class BaseFeature {
    // - The express Application
    public app : express.Application;
    // - The name of features
    public name : string;
    // - The description of the feature
    public description : string ;

    public constructor(app:express.Application, name: string, description: string) {
        this.app = app;
        this.name = name;
        this.description = description;
    }

    /**
     * Initialize the feature (routes,controllers,etc)
     * @return void
     */
    public abstract  init() : void ;
}