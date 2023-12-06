import { BaseService } from "../../../abstracts/service.base";
import { verifyHash, generateHash } from "../utils/encryptionUtils";
import ApiError from "../../../utils/apiError";
import * as gravatar from 'gravatar';
import { User } from "../entities";
export class UserService extends BaseService {
    constructor() {
        super("user", User);
    }
    async createUser(user) {
        const { pseudo, email, password, avatar, country, age, email_verified, roles } = user;
        if (!pseudo || !email || !password || !country || !age) {
            throw new ApiError({ status: 400, message: 'Pseudo, email, country, age, password are required fields .' });
        }
        // Hash the password before storing it 
        // console.log("user : ", user)
        const hashedPassword = await generateHash(password);
        // Create default avatar
        const userAvatar = avatar || gravatar.url(email, { s: '100', r: 'x', 'd': 'retro' }, true);
        const newUser = this.repository.create({
            pseudo: pseudo,
            email: email,
            password: hashedPassword,
            country: country,
            age: age,
            avatar: userAvatar || '',
            email_verified: email_verified || false,
            roles: roles || 'user',
        });
        return await this.repository.save(newUser);
    }
    async updateUser(userId, updates) {
        const user = await this.repository.findOne({ where: { id: userId } });
        if (user && updates) {
            Object.assign(user, updates);
            await this.repository.save(user);
            // console.log("newUser after Token : ", user)
            return user;
        }
        return;
    }
    async getAllUsers() {
        return await this.repository.find();
    }
    async getUserById(userId) {
        return this.repository.findOne({ where: { id: userId } });
    }
    async getUserByMail(mail) {
        return this.repository.findOne({ where: { email: mail } });
    }
    async validateUserCredentials(mail, password) {
        const user = await this.repository.findOne({ where: { email: mail } });
        if (user && await verifyHash(password, user.password)) {
            return true;
        }
        return false;
    }
    async deleteUser(userId) {
        await this.repository.delete(userId);
    }
    async deleteUsers(userIds) {
        await this.repository.delete(userIds);
    }
    async activateUser(userId) {
        await this.repository.update(userId, { is_active: true });
    }
    async deactivateUser(userId) {
        await this.repository.update(userId, { is_active: false });
    }
    async markEmailVerified(userId) {
        await this.repository.update(userId, { email_verified: true });
    }
}
