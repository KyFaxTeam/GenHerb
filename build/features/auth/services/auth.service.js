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
exports.AuthService = void 0;
const authTokenGenerator_1 = require("../utils/authTokenGenerator");
const encryptionUtils_1 = require("../utils/encryptionUtils");
const sendEmail_1 = require("../../../utils/sendEmail");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    login(mail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidCredentials = yield this.userService.validateUserCredentials(mail, password);
            if (isValidCredentials) {
                const user = yield this.userService.getUserByMail(mail);
                if (user) {
                    // Génère un token et le renvoie
                    const token = (0, authTokenGenerator_1.generateToken)(user);
                    // const hashedToken = await generateHash(token)
                    const accessToken = (0, authTokenGenerator_1.generateAccessToken)(user);
                    yield this.userService.updateUser(user.id, { 'token': token, 'accessToken': accessToken });
                    return token;
                }
            }
            return null;
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.updateUser(user.id, { 'token': null, 'accessToken': null });
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pseudo, email, password, country, age } = user;
            // console.log("//////////////// country :", country)
            if (!pseudo || !email || !password || !country || !age) {
                throw new apiError_1.default({ status: 400, message: 'Pseudo, email, password, country and age are required fields.' });
            }
            const existingUser = yield this.userService.getUserByMail(email);
            if (existingUser) {
                console.error('User with this email already exists.');
                return null;
            }
            const newUser = yield this.userService.createUser(user);
            if (!newUser) {
                console.error('Failed to create user.');
                return null;
            }
            // console.log("newUser : ", newUser)
            const token = (0, authTokenGenerator_1.generateToken)(newUser);
            // const hashedToken = await generateHash(token)
            const accessToken = (0, authTokenGenerator_1.generateAccessToken)(newUser);
            yield this.userService.updateUser(newUser.id, { 'token': token, 'accessToken': accessToken });
            // // Exclude the 'password' property from newUser
            // const { password: excludedPassword, ...userWithoutPassword } = newUser;
            return token;
        });
    }
    changePassword(userId, newPassword, newToken, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userService.getUserById(userId);
            if (!existingUser) {
                console.log("User with this id does not exists. ");
                return;
            }
            const hashedPassword = yield (0, encryptionUtils_1.generateHash)(newPassword);
            // const hashedToken = await generateHash(newToken)
            return yield this.userService.updateUser(userId, { password: hashedPassword, accessToken: accessToken, token: newToken });
        });
    }
    forgotPassword(email, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByMail(email);
            if (!user) {
                console.log("Informations of password reset have been sent ❌");
                return null;
            }
            const tempToken = (0, authTokenGenerator_1.generateResetPasswordToken)(user);
            // const hashedToken = await generateHash(tempToken)
            yield this.userService.updateUser(user.id, { 'accessToken': tempToken });
            const sendEmail = new sendEmail_1.EmailService();
            return yield sendEmail.sendResetPasswordEmail(email, tempToken, newPassword);
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, authTokenGenerator_1.returnvalidateUser)(token);
            if (id) {
                const existingUser = yield this.userService.getUserById(id);
                if (existingUser) {
                    const bool = yield (0, encryptionUtils_1.verifyHash)(token, existingUser.accessToken);
                    if (bool) {
                        const accessToken = (0, authTokenGenerator_1.generateAccessToken)(existingUser);
                        const newtoken = (0, authTokenGenerator_1.generateToken)(existingUser);
                        const updateUser = yield this.changePassword(existingUser.id, newPassword, newtoken, accessToken);
                        if (updateUser) {
                            return newtoken;
                        }
                    }
                }
            }
            return null;
        });
    }
    refreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.accessToken) {
                const bool = (0, authTokenGenerator_1.isverifyTokenAndValidDate)(user.accessToken);
                if (bool !== null) {
                    const newToken = (0, authTokenGenerator_1.generateToken)(user);
                    // const hashedToken = await generateHash(newToken)
                    if (bool) {
                        yield this.userService.updateUser(user.id, { 'token': newToken });
                        // console.log('Token access not expired')
                    }
                    else {
                        // console.log('Token access is expired')
                        const accessToken = (0, authTokenGenerator_1.generateAccessToken)(user);
                        yield this.userService.updateUser(user.id, { 'token': newToken, 'accessToken': accessToken });
                    }
                    return newToken;
                }
            }
            return null;
        });
    }
}
exports.AuthService = AuthService;
