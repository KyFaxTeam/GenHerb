"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const controller_base_1 = __importDefault(require("../../../abstracts/controller.base"));
const success_response_send_1 = require("../../../utils/success.response.send");
class EventController extends controller_base_1.default {
    constructor() {
        super(new services_1.EventService());
        /**
         * Controller method to handle the request for retrieving active or expired events.
         * @param req - Express Request object.
         * @param res - Express Response object.
         * @returns A Promise representing the asynchronous operation.
         */
        this.eventByStatus = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Extract the 'isActive' parameter from the request parameters.
            const { status } = req.params;
            // Call the service method to get active or expired events based on the 'status' parameter.
            const result = yield this.service.getEventsByStatus(status);
            // Send the result as the response.
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
        // * 2 - 
        this.eventStartToPlay = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const result = yield this.service.getEventStartToPlay(id);
            // Send the result as the response.
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
        // * 3 - 
        this.eventWithId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Extract the 'id' parameter from the request
            const { id } = req.query;
            const result = yield this.service.getEventWithId(id);
            // Send the result as the response.
            res.send((0, success_response_send_1.successResponseFormat)(result));
        }));
    }
}
exports.default = EventController;
