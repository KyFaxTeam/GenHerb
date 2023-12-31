"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../utils/catchAsync");
const pick_1 = __importDefault(require("../utils/pick"));
class BaseController {
    constructor(service) {
        this.catchAsync = catchAsync_1.catchAsync;
        this.pick = pick_1.default;
        this.service = service;
    }
}
exports.default = BaseController;
