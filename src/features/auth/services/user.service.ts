import { BaseService } from "../../../abstracts/service.base";
import { verifyHash, generateHash } from "../utils/encryptionUtils";
import * as gravatar from 'gravatar'; 


import { UserInterface } from "../interfaces";
import { User } from "../entities";

export class UserService extends BaseService<User> {

    public constructor() {
        super("user", User);
    }

    async createUser(user:UserInterface) : Promise<User> {
        const { pseudo, email, password, avatar, email_verified } = user; 

        // Hash the password before storing it 
        const hashedPassword = await generateHash(password, 8)

        // Create default avatar
        const userAvatar = avatar || gravatar.url(email, {s: '100', r: 'x', 'd': 'retro'}, true);

        const newUser = this.repository.create({
            pseudo,
            email, 
            password: hashedPassword, 
            avatar: userAvatar || '', 
            email_verified: email_verified || false, 
        })

        return await this.repository.save(newUser)
    }

    async updateUser(userId: number, updates: Partial<UserInterface>): Promise<User | void> {
        const user = await this.repository.findOne({ where: { id: userId } })

        if (user && updates) {
            Object.assign(user, updates); 
            await this.repository.save(user);
            return user; 
        }

        return ;
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.repository.findOne({ where: { id: userId } });
    }


    async getUserByMail(mail: string): Promise<User | null> {
        return this.repository.findOne({ where: { email: mail } });
    }

    async validateUserCredentials(mail: string, password: string): Promise<boolean> {
        const user = await this.repository.findOne({ where: { email: mail } });
    
        if (user && await verifyHash(password, user.password)) {
          return true;
        }
    
        return false;
    }

    async deleteUser(userId: number): Promise<void> {
        await this.repository.delete(userId);
    }

    async activateUser(userId: number): Promise<void> {
        await this.repository.update(userId, { is_active: true });
    }

    async deactivateUser(userId: number): Promise<void> {
        await this.repository.update(userId, { is_active: false})
    }

    async markEmailVerified(userId: number): Promise<void> {
        await this.repository.update(userId, { email_verified: true });
    }
    
}


