import { UserService } from './user.service';
import { AuthTokenGenerator } from '../utils/authTokenGenerator';
import { User } from '../entities';
import { generateHash } from '../utils/encryptionUtils';
import { EmailService } from '../../../utils/sendEmail';
import { UserInterface } from '../interfaces';

export class AuthService {
  private userService: UserService;
  private authTokenGenerator: AuthTokenGenerator;

  constructor(userService: UserService, authTokenGenerator: AuthTokenGenerator) {
    this.userService = userService;
    this.authTokenGenerator = authTokenGenerator;
  }

  async login(mail: string, password: string): Promise<string | null> {
    
    const isValidCredentials = await this.userService.validateUserCredentials(mail, password);

    if (isValidCredentials) {
      
      const user = await this.userService.getUserByMail(mail);

      if (user) {
        // Génère un token et le renvoie
        const token = this.authTokenGenerator.generateToken(user);
        await this.userService.updateUser(user.id, {'token': token})

        return token;
      }
    }

    return null;
  }

  async logout(user: UserInterface): Promise<void> {
    user.token = ''; 
    await this.userService.repository.save(user)
  }




  async register(pseudo: string, mail: string, password: string): Promise<string | null> {
    
    const existingUser = await this.userService.getUserByMail(mail);

    if (existingUser) {
      console.error('User with this email already exists.');
      return null;
    }

    const newUser = await this.userService.createUser({ pseudo, email: mail, password });

    if (!newUser) {
      console.error('Failed to create user.');
      return null;
    }

    const token = this.authTokenGenerator.generateToken(newUser);
    await this.userService.updateUser(newUser.id, {'token': token})
    
    return token;
  }


  async changePassword(userId: number, newPassword: string): Promise<User | void> {
    
    const existingUser = await this.userService.getUserById(userId);

    if (!existingUser) {
        console.log("User with this id does not exists. ")
        return 
    }

    const hashedPassword = await generateHash(newPassword, 10 )
    return await this.userService.updateUser(userId, { password: hashedPassword });
    
  }

  async forgotPassword(mail: string): Promise<void> {
    const user = await this.userService.getUserByMail(mail);

    if(!user) {
        console.log("Informations of password reset have been sent ❌")
        return ;
    }

    const token = this.authTokenGenerator.generateResetPasswordToken(user);
    await this.userService.updateUser(user.id, {'token': token})


    const sendEmail = new EmailService()
    return await sendEmail.sendResetPasswordEmail(mail, token)
    
  }

  async resetPassword(token: string, newPassword: string): Promise<User|void> {
    
    const userId = this.authTokenGenerator.returnvalidateUserId(token)
    if (userId) {
        const existingUser = await this.userService.getUserById(userId as number);

        if (!existingUser) {
            console.log("User with this id does not exists. ")
            return 
        }

        if(existingUser.token !== token) {
            console.log("Token does not match ")
            return 
        }

        const newToken = this.authTokenGenerator.generateToken(existingUser);
        // await this.userService.updateUser(existingUser.id, {'token': newToken})
        
        const hashedPassword = await generateHash(newPassword, 10 )
        return await this.userService.updateUser(existingUser.id, { password: hashedPassword });

    //   return await this.changePassword(userId as number, newPassword)
    } else {
        console.log("You can't reset your password ")
        return ;
    }
  }

  async refreshToken(user: User): Promise<string> {
    const newToken = this.authTokenGenerator.generateToken(user)
    await this.userService.updateUser(user.id, {'token': newToken})
    return newToken

  }


}


