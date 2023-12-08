import { Response, NextFunction } from "express";
import { RequestwithUser } from "../features/auth/interfaces";
import ApiError from "../utils/apiError";
import {getTokenFromHeader, returnvalidateUser } from "../features/auth/utils/authTokenGenerator";
import { UserService } from "../features/auth/services";
// import { verifyHash } from "../features/auth/utils/encryptionUtils";


export const authenticateUser = async (req: RequestwithUser, res: Response, next: NextFunction) => {

  const token = getTokenFromHeader(req);

  console.log("req.path : ",req.path)

  if (!token) {
      // console.log("Token is missing.");
      const error = new ApiError({ status: 403, message: 'Token is missing' });
      return next(error);
  }

  // if (token instanceof ApiError) {
  //   return next(token);
  // }

  if (typeof token === 'string') {

    let userId: number | null
    if (req.path.endsWith("/refresh-token")) {
      userId = returnvalidateUser(token, true);
      // console.log("********************userId: Endswith *****************************: ", userId)
  
    } else {
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
  
  } else {
    return next(token);
  }
};




export const requiredRole = (role: string) => {
    return (req: RequestwithUser, _res: Response, next: NextFunction) => {
        const userRoles = req.user.roles;

        if (userRoles === role) {
            next();

        } else {
            const error = new ApiError({ status: 403, message: "Unauthorized" });
            next(error);
        }
    };
};



export const verifyOwnership = async (req: RequestwithUser, res: Response, next: NextFunction) => {
    const userToken = req.user.token
    if (!userToken) {
      const error = new ApiError({ status: 403, message: 'Invalid User token' });
      return next(error);
    }
    
    // console.log("req.token : ",req.token)
    // console.log("userToken : ", userToken)
    // const isToken = await verifyHash(req.token, userToken)
    const isToken = req.token === userToken

    // console.log("Is Valid Token : ", isToken)

    // Vérifie si l'utilisateur est le propriétaire du compte
    if (isToken) {
      next();
    } else {
      const error = new ApiError({ status: 403, message: 'Unauthorized Action' });
      next(error);
    }
};




export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
  