import { UserService } from './user.service';
import { generateToken, returnvalidateUser,  generateResetPasswordToken} from '../utils/authTokenGenerator';
import { User } from '../entities';
import { generateHash, verifyHash } from '../utils/encryptionUtils';
import { EmailService } from '../../../utils/sendEmail';
import { UserInterface } from '../interfaces';
import ApiError from '../../../utils/apiError';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(mail: string, password: string): Promise<string | null> {
    
    const isValidCredentials = await this.userService.validateUserCredentials(mail, password);

    if (isValidCredentials) {
      
      const user = await this.userService.getUserByMail(mail);

      if (user) {
        // Génère un token et le renvoie
        const token = generateToken(user);
        await this.userService.updateUser(user.id, {'token': token})

        return token;
      }
    }

    return null;
  }

  async logout(user: User): Promise<void> {
    user.token = ''; 
    await this.userService.repository.save(user)
  }


  async register(user: Partial<UserInterface>): Promise<string | null> {
    // console.log("//////////////// email :", email)
    const { pseudo, email, password } = user;

    if (!pseudo || !email || !password) {
      throw new ApiError({ status: 400, message: 'Pseudo, email, and password are required fields.' })
    }

    const existingUser = await this.userService.getUserByMail(email);

    if (existingUser) {
      console.error('User with this email already exists.');
      return null;
    }

    const newUser = await this.userService.createUser(user);

    if (!newUser) {
      console.error('Failed to create user.');
      return null;
    }

    // console.log("newUser : ", newUser)

    
    const token = generateToken(newUser);
    await this.userService.updateUser(newUser.id, {'token': token})
    
      // // Exclude the 'password' property from newUser
      // const { password: excludedPassword, ...userWithoutPassword } = newUser;
    
    return token;
  }


  async changePassword(userId: number, newPassword: string): Promise<User | void> {
    
    const existingUser = await this.userService.getUserById(userId);

    if (!existingUser) {
        console.log("User with this id does not exists. ")
        return 
    }

    const hashedPassword = await generateHash(newPassword)
    return await this.userService.updateUser(userId, { password: hashedPassword, tempToken: null });
    
  }

  async forgotPassword(email: string, newPassword: string): Promise<void | null> {
    const user = await this.userService.getUserByMail(email);

    if(!user) {
        console.log("Informations of password reset have been sent ❌")
        return null;
    }

    const tempToken = generateResetPasswordToken(user);
    await this.userService.updateUser(user.id, {'tempToken': await generateHash(tempToken)})

    const sendEmail = new EmailService()
    return await sendEmail.sendResetPasswordEmail(email, tempToken, newPassword)
    
  }

  async resetPassword(token: string, newPassword: string): Promise<string|null> {
    
      
    const existingUser = returnvalidateUser(token)
    if(!existingUser){
        return null;
    }

    const bool = verifyHash(token, existingUser.tempToken as string)
    if (!bool) {
      return null;
    }

    const updateUser = await this.changePassword(existingUser.id, newPassword)
    if (!updateUser) {
      return null
    }
    
    const newtoken = await this.refreshToken(updateUser)
    return newtoken
  }

  async refreshToken(user: User): Promise<string> {
    const newToken = generateToken(user)
    await this.userService.updateUser(user.id, {'token': newToken})
    return newToken

  }


}


