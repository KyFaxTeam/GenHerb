import { Request, Response } from 'express';

import BaseController from '../../../abstracts/controller.base';
import { UserService } from '../services/';
import { successResponseFormat } from '../../../utils/success.response.send';
import ApiError from '../../../utils/apiError';

export class UserController extends BaseController {

  constructor() {
    super(new UserService)
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
  
  getUserById = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await this.service.getUserById(userId);
    if (user) {
      res.status(200).send(successResponseFormat(user));
    } else {
      res.send(new ApiError({ status: 404, message: 'User not found.' }));
    }
  });

  updateUser = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const updates = req.body;
    const user = await this.service.updateUser(userId, updates);
    if (user) {
      res.status(200).send(successResponseFormat(user));
    } else {
      res.send(new ApiError({ status: 404, message: 'User not found.' }));
    }
  });

  deleteUser = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    await this.service.deleteUser(userId);
    res.status(204).send(successResponseFormat({ message: 'User deleted successfully.' }));
  });

  activateUser = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    await this.service.activateUser(userId);
    res.status(200).send(successResponseFormat({ message: 'User activated successfully.' }));
  });

  deactivateUser = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    await this.service.deactivateUser(userId);
    res.status(200).send(successResponseFormat({ message: 'User deactivated successfully.' }));
  });

  markEmailVerified = this.catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    await this.service.markEmailVerified(userId);
    res.status(200).send(successResponseFormat({ message: 'Mark Email Verified successfully.' }));
  });
}
