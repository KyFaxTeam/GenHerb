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
exports.UserController = void 0;
const controller_base_1 = __importDefault(require("../../../abstracts/controller.base"));
const services_1 = require("../services/");
const success_response_send_1 = require("../../../utils/success.response.send");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const interfaces_1 = require("../interfaces");
class UserController extends controller_base_1.default {
    constructor() {
        super(new services_1.UserService);
        //   createUser = this.catchAsync(async(req: Request, res: Response) => {
        //     const userData = req.body;
        //     const user = await this.service.createUser(userData);
        //     if (user) {
        //     res.status(201).send(successResponseFormat(user));
        //     } else {
        //     res.send(new ApiError({ status: 400, message: 'Failed to create user.' }))
        //     }
        //   })
        this.getUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // const user = await this.service.getUser(req.user.id);
            if (req.user) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)((0, interfaces_1.createSafeUser)(req.user)));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'User not found.' }));
            }
        }));
        this.getUserById = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const user = yield this.service.getUserById(userId);
            if (user) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)((0, interfaces_1.createSafeUser)(user)));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'User not found.' }));
            }
        }));
        this.getAllUsers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAllUsers();
            if (users) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(users));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'User not found.' }));
            }
        }));
        this.updateUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const updates = req.body;
            const user = yield this.service.updateUser(req.user.id, updates);
            if (user) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(user));
            }
            else {
                res.send(new apiError_1.default({ status: 404, message: 'User not found.' }));
            }
        }));
        this.deleteUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.deleteUser(req.user.id);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'User deleted successfully.' }));
        }));
        this.deleteUsers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userIds } = req.body;
            if (!userIds || userIds.length === 0) {
                res.status(400).json({ message: 'User IDs are required for deletion.' });
            }
            yield this.service.deleteUsers(userIds);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'User deleted successfully.' }));
        }));
        // heartbeart = this.catchAsync(async (req:RequestwithUser, res: Response) => {
        //   const updates = { 'lastActive': new Date() }
        //   await this.service.updateUser(req.user.id, updates)
        //   res.status(200).send(successResponseFormat({ message: 'User update lastActive successfully.' }));
        // })
        this.activateUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.activateUser(req.user.id);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'User activated successfully.' }));
        }));
        this.deactivateUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.deactivateUser(req.user.id);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'User deactivated successfully.' }));
        }));
        this.markEmailVerified = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.markEmailVerified(req.user.id);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'Mark Email Verified successfully.' }));
        }));
    }
}
exports.UserController = UserController;
