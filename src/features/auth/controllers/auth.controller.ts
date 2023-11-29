import { Request, Response } from 'express';
import BaseController from '../../../abstracts/controller.base';
import { AuthService } from '../services/';
import { UserService } from '../services/';
import { successResponseFormat } from '../../../utils/success.response.send';
import ApiError from '../../../utils/apiError';

export class AuthController extends BaseController {

  constructor() {
    super(new AuthService(new UserService()));
  }

  register = this.catchAsync(async (req: Request, res: Response) => {
    // console.log("***userData*** : ", req.body)
    const { pseudo, email, password } = req.body;
    const user = await this.service.register(pseudo, email, password);
    if (user) {
      res.status(201).send(successResponseFormat(user));
    } else {
      res.send(new ApiError({ status: 400, message: 'Failed to register user.' }));
    }
  });

  login = this.catchAsync(async (req: Request, res: Response) => {
    const { mail, password } = req.body;
    const token = await this.service.login(mail, password);
    if (token) {
      res.status(200).send(successResponseFormat({ token }));
    } else {
      res.send(new ApiError({ status: 401, message: 'Invalid credentials.' }));
    }
  });

  forgotPassword = this.catchAsync(async (req: Request, res: Response) => {
    const { mail } = req.body;
    const result = await this.service.forgotPassword(mail);
    res.status(200).send(successResponseFormat({ message: 'Password reset instructions sent.' }));
  });

  resetPassword = this.catchAsync(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const user = await this.service.resetPassword(token, newPassword);
    if (user) {
        res.status(200).send(successResponseFormat({ user }));
    } else {
      res.send(new ApiError({ status: 401, message: 'Password reset error.' }));
    }
    
  });

//   logout = this.catchAsync(async (req: Request, res: Response) => {
//     await this.service.logout(req.user);
//     res.status(200).send(successResponseFormat({ message: 'Logout successful.' }));
//   });
  
// refresh = this.catchAsync(async (req: Request, res: Response) => {
//     const newToken = await this.service.refreshToken(req.user);
//     if (newToken) {
//       res.status(200).send(successResponseFormat(newToken));
//     } else {
//       res.send(new ApiError({ status: 401, message: 'Invalid refresh token.' }));
//     }
//   });
  

//   getCurrentUser = this.catchAsync(async (req: Request, res: Response) => {
//     const userId = req.user.id; 
//     const user = await this.service.userService.getUserById(userId);
//     res.status(200).send(successResponseFormat(user));
//   });
  

// changePassword = this.catchAsync(async (req: Request, res: Response) => {
      //Get ID from JWT
// const id = res.locals.jwtPayload.userId;
//     const { currentPassword, newPassword } = req.body;
//     const userId = req.user.id; // ou tout autre moyen d'obtenir l'ID de l'utilisateur actuel
//     await this.service.changePassword(userId, currentPassword, newPassword);
//     res.status(200).send(successResponseFormat({ message: 'Password changed successfully.' }));
//   });
  
}
