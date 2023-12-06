import BaseController from '../../../abstracts/controller.base';
import { UserService } from '../services/';
import { successResponseFormat } from '../../../utils/success.response.send';
import ApiError from '../../../utils/apiError';
import { createSafeUser } from '../interfaces';
export class UserController extends BaseController {
    constructor() {
        super(new UserService);
    }
    //   createUser = this.catchAsync(async(req: Request, res: Response) => {
    //     const userData = req.body;
    //     const user = await this.service.createUser(userData);
    //     if (user) {
    //     res.status(201).send(successResponseFormat(user));
    //     } else {
    //     res.send(new ApiError({ status: 400, message: 'Failed to create user.' }))
    //     }
    //   })
    getUser = this.catchAsync(async (req, res) => {
        // const user = await this.service.getUser(req.user.id);
        if (req.user) {
            res.status(200).send(successResponseFormat(createSafeUser(req.user)));
        }
        else {
            res.send(new ApiError({ status: 404, message: 'User not found.' }));
        }
    });
    getUserById = this.catchAsync(async (req, res) => {
        const userId = parseInt(req.params.userId);
        const user = await this.service.getUserById(userId);
        if (user) {
            res.status(200).send(successResponseFormat(createSafeUser(user)));
        }
        else {
            res.send(new ApiError({ status: 404, message: 'User not found.' }));
        }
    });
    getAllUsers = this.catchAsync(async (req, res) => {
        const users = await this.service.getAllUsers();
        if (users) {
            res.status(200).send(successResponseFormat(users));
        }
        else {
            res.send(new ApiError({ status: 404, message: 'User not found.' }));
        }
    });
    updateUser = this.catchAsync(async (req, res) => {
        const updates = req.body;
        const user = await this.service.updateUser(req.user.id, updates);
        if (user) {
            res.status(200).send(successResponseFormat(user));
        }
        else {
            res.send(new ApiError({ status: 404, message: 'User not found.' }));
        }
    });
    deleteUser = this.catchAsync(async (req, res) => {
        await this.service.deleteUser(req.user.id);
        res.status(200).send(successResponseFormat({ message: 'User deleted successfully.' }));
    });
    deleteUsers = this.catchAsync(async (req, res) => {
        const { userIds } = req.body;
        if (!userIds || userIds.length === 0) {
            res.status(400).json({ message: 'User IDs are required for deletion.' });
        }
        await this.service.deleteUsers(userIds);
        res.status(200).send(successResponseFormat({ message: 'User deleted successfully.' }));
    });
    // heartbeart = this.catchAsync(async (req:RequestwithUser, res: Response) => {
    //   const updates = { 'lastActive': new Date() }
    //   await this.service.updateUser(req.user.id, updates)
    //   res.status(200).send(successResponseFormat({ message: 'User update lastActive successfully.' }));
    // })
    activateUser = this.catchAsync(async (req, res) => {
        await this.service.activateUser(req.user.id);
        res.status(200).send(successResponseFormat({ message: 'User activated successfully.' }));
    });
    deactivateUser = this.catchAsync(async (req, res) => {
        await this.service.deactivateUser(req.user.id);
        res.status(200).send(successResponseFormat({ message: 'User deactivated successfully.' }));
    });
    markEmailVerified = this.catchAsync(async (req, res) => {
        await this.service.markEmailVerified(req.user.id);
        res.status(200).send(successResponseFormat({ message: 'Mark Email Verified successfully.' }));
    });
}
