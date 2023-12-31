
// import { Request, Response, NextFunction } from "express";
// import logger from "../utils/logger";
// import { dbSource } from "../config/data.source";

// // Middleware pour vérifier si la base de données est prête
// export const checkDatabaseMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // Vérifiez si la base de données est prête



    
//     if (dbSource.isReady()) {
//         // Si la base de données est prête, passez à l'exécution du gestionnaire de route
//         next();
//     } else {
//         // Si la base de données n'est pas prête, renvoyez une erreur
//         const error = new Error("Database not ready");
//         logger.error("Database not ready");
//         next(error);
//     }
// };
