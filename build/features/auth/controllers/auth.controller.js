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
exports.AuthController = void 0;
const controller_base_1 = __importDefault(require("../../../abstracts/controller.base"));
const services_1 = require("../services/");
const services_2 = require("../services/");
const success_response_send_1 = require("../../../utils/success.response.send");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
class AuthController extends controller_base_1.default {
    constructor() {
        super(new services_1.AuthService(new services_2.UserService()));
        this.register = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log("***userData*** : ", req.body)
            const token = yield this.service.register(req.body);
            if (token) {
                res.status(201).send((0, success_response_send_1.successResponseFormat)({ token }));
            }
            else {
                res.send(new apiError_1.default({ status: 400, message: 'Failed to register user.' }));
            }
        }));
        this.login = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { mail, password } = req.body;
            const token = yield this.service.login(mail, password);
            if (token) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)({ token }));
            }
            else {
                res.send(new apiError_1.default({ status: 401, message: 'Invalid credentials.' }));
            }
        }));
        this.forgotPassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword } = req.body;
            const result = yield this.service.forgotPassword(email, newPassword);
            if (result === null) {
                res.send(new apiError_1.default({ status: 401, message: 'User not found' }));
            }
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'Password reset instructions sent.' }));
        }));
        this.resetPassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const newPassword = req.query.new_password;
            const newToken = yield this.service.resetPassword(token, newPassword);
            if (newToken) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)({ newToken }));
            }
            else {
                res.send(new apiError_1.default({ status: 401, message: 'Password reset error.' }));
            }
        }));
        this.logout = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.logout(req.user);
            res.status(200).send((0, success_response_send_1.successResponseFormat)({ message: 'Logout successful.' }));
        }));
        this.refreshToken = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const newToken = yield this.service.refreshToken(req.user);
            if (newToken) {
                res.status(200).send((0, success_response_send_1.successResponseFormat)(newToken));
            }
            else {
                res.send(new apiError_1.default({ status: 401, message: 'Invalid refresh token.' }));
            }
        }));
    }
}
exports.AuthController = AuthController;
