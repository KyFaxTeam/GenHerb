"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a base config for all features
 */
class BaseFeature {
    constructor(app, name, description) {
        this.app = app;
        this.name = name;
        this.description = description;
    }
}
exports.default = BaseFeature;
