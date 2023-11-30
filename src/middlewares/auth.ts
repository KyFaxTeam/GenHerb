import { Response, NextFunction } from "express";
import { RequestwithUser } from "../features/auth/interfaces";
import ApiError from "../utils/apiError";
import { returnvalidateUser } from "../features/auth/utils/authTokenGenerator"


export const authenticateUser = async (req: RequestwithUser, _res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (token) {
        const user = returnvalidateUser(token)
        if (user) {
            req.user = user;

            console.log("******** req.user **********: ", req.user)
            next();
        } 
    }
    const error = new ApiError({ status: 403, message: 'Token Or User is invalid' });
    next(error)

  };


export const requiredRole = (role: string) => {
  return (req: RequestwithUser, _res: Response, next: NextFunction) => {
    const userRoles = req.user.roles;

    if (userRoles.includes(role)) {
      next();

    } else {
      const error = new ApiError({ status: 403, message: 'Unauthorized' });
      next(error);
    }
  };
};


export const verifyOwnership = (req: RequestwithUser, res: Response, next: NextFunction) => {
    const userIdFromToken = req.user.id; 
  
    // Récupère l'ID du compte à partir des paramètres de la requête, par exemple, dans l'URL
    const accountId = parseInt(req.params.id, 10)
  
    // Vérifie si l'utilisateur est le propriétaire du compte
    if (userIdFromToken === accountId) {
      next();
    } else {
      res.status(403).json({ message: "Unhautorized Action" });
    }
  };


  export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  };
  