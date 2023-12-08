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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isverifyTokenAndValidDate = exports.getTokenFromHeader = exports.getPayload = exports.returnvalidateUser = exports.isverifyToken = exports.generateEmailVerificationToken = exports.generateResetPasswordToken = exports.generateAccessToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const secretKey = config_1.default.secretKey;
const generateBasePayload = (user) => {
    return {
        userId: user.id,
        email: user.email,
    };
};
const generateToken = (user) => {
    const payload = generateBasePayload(user);
    const options = {
        expiresIn: '2d',
    };
    return jwt.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
const generateAccessToken = (user) => {
    const payload = generateBasePayload(user);
    const options = {
        expiresIn: '15d',
    };
    return jwt.sign(payload, secretKey, options);
};
exports.generateAccessToken = generateAccessToken;
// private generateToken(user: User): string {
//   const today = new Date();
//   const exp = new Date(today);
//   exp.setDate(today.getDate() + 60);
//   return jwt.sign(
//     {
//       id: user.id, // We are gonna use this in the middleware 'isAuth'
//       role: user.role,
//       name: user.name,
//       exp: exp.getTime() / 1000,
//     },
//     config.jwtSecret,
//   );
// }
const generateResetPasswordToken = (user) => {
    const payload = generateBasePayload(user);
    const options = {
        expiresIn: '10m',
    };
    return jwt.sign(payload, secretKey, options);
};
exports.generateResetPasswordToken = generateResetPasswordToken;
const generateEmailVerificationToken = (user) => {
    const payload = generateBasePayload(user);
    const options = {
        expiresIn: '4h',
    };
    return jwt.sign(payload, secretKey, options);
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const isverifyToken = (token) => {
    try {
        jwt.verify(token, secretKey, { ignoreExpiration: false });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.isverifyToken = isverifyToken;
const returnvalidateUser = (token, exp = false) => {
    try {
        const decodedToken = jwt.verify(token, secretKey, { ignoreExpiration: exp });
        // console.log(" //////////////// decodedToken: ", decodedToken)
        return decodedToken.userId;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.returnvalidateUser = returnvalidateUser;
const getPayload = (token) => {
    try {
        const decodedToken = jwt.decode(token, { complete: true });
        return (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.payload) || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.getPayload = getPayload;
const getTokenFromHeader = (req) => {
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Token') || authorizationHeader.startsWith('Bearer')) {
        return authorizationHeader.split(' ')[1];
    }
    return null;
};
exports.getTokenFromHeader = getTokenFromHeader;
const isverifyTokenAndValidDate = (token) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        // console.log("decodedToken: ", decodedToken)
        const expirationDate = decodedToken.exp * 1000;
        const currentDate = new Date().getTime();
        const threshold = 2 * 24 * 60 * 60 * 1000; // 2d in milliseconds
        if (expirationDate - currentDate > threshold) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.isverifyTokenAndValidDate = isverifyTokenAndValidDate;
// const verifyTokenAndCheckDatabase = async (token: string): Promise<User | null> => {
//   try {
//     // Vérification de la signature et décryptage du token
//     const decodedToken: any = jwt.verify(token, 'your-secret-key');
//     // Récupération de l'identifiant de l'utilisateur depuis les revendications du token
//     const userId = decodedToken.userId;
//     // Récupération de l'utilisateur depuis la base de données
//     const userRepository = new UserRepository();
//     const user = await userRepository.getUserById(userId);
//     // Vérification si le token stocké correspond au token reçu dans la requête
//     if (user && user.token === token) {
//       return user;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     // Gérer les erreurs de vérification du token
//     console.error(error);
//     return null;
//   }
// };
// // Utilisation de la fonction de validation du token
// const user = await verifyTokenAndCheckDatabase(receivedToken);
// if (user) {
//   // L'utilisateur est authentifié
// } else {
//   // Le token n'est pas valide ou ne correspond pas à celui stocké dans la base de données
// }
// }
