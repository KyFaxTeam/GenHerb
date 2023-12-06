import { generateToken, returnvalidateUser, generateResetPasswordToken, generateAccessToken, isverifyTokenAndValidDate } from '../utils/authTokenGenerator';
import { generateHash, verifyHash } from '../utils/encryptionUtils';
import { EmailService } from '../../../utils/sendEmail';
import ApiError from '../../../utils/apiError';
export class AuthService {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async login(mail, password) {
        const isValidCredentials = await this.userService.validateUserCredentials(mail, password);
        if (isValidCredentials) {
            const user = await this.userService.getUserByMail(mail);
            if (user) {
                // Génère un token et le renvoie
                const token = generateToken(user);
                // const hashedToken = await generateHash(token)
                const accessToken = generateAccessToken(user);
                await this.userService.updateUser(user.id, { 'token': token, 'accessToken': accessToken });
                return token;
            }
        }
        return null;
    }
    async logout(user) {
        await this.userService.updateUser(user.id, { 'token': null, 'accessToken': null });
    }
    async register(user) {
        const { pseudo, email, password, country, age } = user;
        // console.log("//////////////// country :", country)
        if (!pseudo || !email || !password || !country || !age) {
            throw new ApiError({ status: 400, message: 'Pseudo, email, password, country and age are required fields.' });
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
        // const hashedToken = await generateHash(token)
        const accessToken = generateAccessToken(newUser);
        await this.userService.updateUser(newUser.id, { 'token': token, 'accessToken': accessToken });
        // // Exclude the 'password' property from newUser
        // const { password: excludedPassword, ...userWithoutPassword } = newUser;
        return token;
    }
    async changePassword(userId, newPassword, newToken, accessToken) {
        const existingUser = await this.userService.getUserById(userId);
        if (!existingUser) {
            console.log("User with this id does not exists. ");
            return;
        }
        const hashedPassword = await generateHash(newPassword);
        // const hashedToken = await generateHash(newToken)
        return await this.userService.updateUser(userId, { password: hashedPassword, accessToken: accessToken, token: newToken });
    }
    async forgotPassword(email, newPassword) {
        const user = await this.userService.getUserByMail(email);
        if (!user) {
            console.log("Informations of password reset have been sent ❌");
            return null;
        }
        const tempToken = generateResetPasswordToken(user);
        // const hashedToken = await generateHash(tempToken)
        await this.userService.updateUser(user.id, { 'accessToken': tempToken });
        const sendEmail = new EmailService();
        return await sendEmail.sendResetPasswordEmail(email, tempToken, newPassword);
    }
    async resetPassword(token, newPassword) {
        const id = returnvalidateUser(token);
        if (id) {
            const existingUser = await this.userService.getUserById(id);
            if (existingUser) {
                const bool = await verifyHash(token, existingUser.accessToken);
                if (bool) {
                    const accessToken = generateAccessToken(existingUser);
                    const newtoken = generateToken(existingUser);
                    const updateUser = await this.changePassword(existingUser.id, newPassword, newtoken, accessToken);
                    if (updateUser) {
                        return newtoken;
                    }
                }
            }
        }
        return null;
    }
    async refreshToken(user) {
        if (user.accessToken) {
            const bool = isverifyTokenAndValidDate(user.accessToken);
            if (bool !== null) {
                const newToken = generateToken(user);
                // const hashedToken = await generateHash(newToken)
                if (bool) {
                    await this.userService.updateUser(user.id, { 'token': newToken });
                    // console.log('Token access not expired')
                }
                else {
                    // console.log('Token access is expired')
                    const accessToken = generateAccessToken(user);
                    await this.userService.updateUser(user.id, { 'token': newToken, 'accessToken': accessToken });
                }
                return newToken;
            }
        }
        return null;
    }
}
