import ApiError from "../utils/apiError";
import { getTokenFromHeader, returnvalidateUser } from "../features/auth/utils/authTokenGenerator";
import { UserService } from "../features/auth/services";
// import { verifyHash } from "../features/auth/utils/encryptionUtils";
export const authenticateUser = async (req, _res, next) => {
    const token = getTokenFromHeader(req);
    // console.log("req.path : ",req.path)
    if (!token) {
        // console.log("Token is missing.");
        const error = new ApiError({ status: 403, message: 'Token is missing' });
        return next(error);
    }
    let userId;
    if (req.path.endsWith("/refresh-token")) {
        userId = returnvalidateUser(token, true);
        // console.log("********************userId: Endswith *****************************: ", userId)
    }
    else {
        userId = returnvalidateUser(token);
        // console.log("********************userId *****************************: ", userId)
    }
    if (!userId) {
        // console.log("Invalid token.");
        const error = new ApiError({ status: 403, message: 'Invalid token' });
        return next(error);
    }
    const service = new UserService();
    const user = await service.getUserById(userId);
    if (!user) {
        // console.log("User not found.");
        const error = new ApiError({ status: 403, message: 'User not found' });
        return next(error);
    }
    req.user = user;
    req.token = token;
    // console.log("Authentication successful.");
    next();
};
export const requiredRole = (role) => {
    return (req, _res, next) => {
        const userRoles = req.user.roles;
        if (userRoles === role) {
            next();
        }
        else {
            const error = new ApiError({ status: 403, message: "Unauthorized" });
            next(error);
        }
    };
};
export const verifyOwnership = async (req, res, next) => {
    const userToken = req.user.token;
    if (!userToken) {
        const error = new ApiError({ status: 403, message: 'Invalid User token' });
        return next(error);
    }
    // console.log("req.token : ",req.token)
    // console.log("userToken : ", userToken)
    // const isToken = await verifyHash(req.token, userToken)
    const isToken = req.token === userToken;
    // console.log("Is Valid Token : ", isToken)
    // Vérifie si l'utilisateur est le propriétaire du compte
    if (isToken) {
        next();
    }
    else {
        const error = new ApiError({ status: 403, message: 'Unauthorized Action' });
        next(error);
    }
};
export const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
