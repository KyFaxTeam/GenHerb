/**
 * This is a base config for all features
 */
export default class BaseFeature {
    // - The express Application
    app;
    // - The name of features
    name;
    // - The description of the feature
    description;
    constructor(app, name, description) {
        this.app = app;
        this.name = name;
        this.description = description;
    }
}
