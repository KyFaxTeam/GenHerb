import BaseController from '../../../abstracts/controller.base';
import { AuthService } from '../services/';
import { UserService } from '../services/';
import { successResponseFormat } from '../../../utils/success.response.send';
import ApiError from '../../../utils/apiError';
export class AuthController extends BaseController {
    constructor() {
        super(new AuthService(new UserService()));
    }
    register = this.catchAsync(async (req, res) => {
        // console.log("***userData*** : ", req.body)
        const token = await this.service.register(req.body);
        if (token) {
            res.status(201).send(successResponseFormat({ token }));
        }
        else {
            res.send(new ApiError({ status: 400, message: 'Failed to register user.' }));
        }
    });
    login = this.catchAsync(async (req, res) => {
        const { mail, password } = req.body;
        const token = await this.service.login(mail, password);
        if (token) {
            res.status(200).send(successResponseFormat({ token }));
        }
        else {
            res.send(new ApiError({ status: 401, message: 'Invalid credentials.' }));
        }
    });
    forgotPassword = this.catchAsync(async (req, res) => {
        const { email, newPassword } = req.body;
        const result = await this.service.forgotPassword(email, newPassword);
        if (result === null) {
            res.send(new ApiError({ status: 401, message: 'User not found' }));
        }
        res.status(200).send(successResponseFormat({ message: 'Password reset instructions sent.' }));
    });
    resetPassword = this.catchAsync(async (req, res) => {
        const { token } = req.params;
        const newPassword = req.query.new_password;
        const newToken = await this.service.resetPassword(token, newPassword);
        if (newToken) {
            res.status(200).send(successResponseFormat({ newToken }));
        }
        else {
            res.send(new ApiError({ status: 401, message: 'Password reset error.' }));
        }
    });
    logout = this.catchAsync(async (req, res) => {
        await this.service.logout(req.user);
        res.status(200).send(successResponseFormat({ message: 'Logout successful.' }));
    });
    refreshToken = this.catchAsync(async (req, res) => {
        const newToken = await this.service.refreshToken(req.user);
        if (newToken) {
            res.status(200).send(successResponseFormat(newToken));
        }
        else {
            res.send(new ApiError({ status: 401, message: 'Invalid refresh token.' }));
        }
    });
}
