"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserService = void 0;
const service_base_1 = require("../../../abstracts/service.base");
const encryptionUtils_1 = require("../utils/encryptionUtils");
const apiError_1 = __importDefault(require("../../../utils/apiError"));
const gravatar = __importStar(require("gravatar"));
const entities_1 = require("../entities");
class UserService extends service_base_1.BaseService {
    constructor() {
        super("user", entities_1.User);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pseudo, email, password, avatar, country, age, email_verified, roles } = user;
            if (!pseudo || !email || !password || !country || !age) {
                throw new apiError_1.default({ status: 400, message: 'Pseudo, email, country, age, password are required fields .' });
            }
            // Hash the password before storing it 
            // console.log("user : ", user)
            const hashedPassword = yield (0, encryptionUtils_1.generateHash)(password);
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
            return yield this.repository.save(newUser);
        });
    }
    updateUser(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ where: { id: userId } });
            if (user && updates) {
                Object.assign(user, updates);
                yield this.repository.save(user);
                // console.log("newUser after Token : ", user)
                return user;
            }
            return;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { id: userId } });
        });
    }
    getUserByMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { email: mail } });
        });
    }
    validateUserCredentials(mail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ where: { email: mail } });
            if (user && (yield (0, encryptionUtils_1.verifyHash)(password, user.password))) {
                return true;
            }
            return false;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(userId);
        });
    }
    deleteUsers(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(userIds);
        });
    }
    activateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(userId, { is_active: true });
        });
    }
    deactivateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(userId, { is_active: false });
        });
    }
    markEmailVerified(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(userId, { email_verified: true });
        });
    }
}
exports.UserService = UserService;
