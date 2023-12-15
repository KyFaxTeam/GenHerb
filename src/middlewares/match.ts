import { Request, Response, NextFunction } from 'express';
import { authenticateUser, verifyOwnership } from './auth';
import { RequestwithUser } from '../features/auth/interfaces';

// Définir les groupes de chemins et les middlewares correspondants
const pathGroups: { [groupName: string]: { middlewares: ((req: RequestwithUser, res: Response, next: NextFunction) => void)[] } } = {
  twoMiddle: {
    middlewares: [authenticateUser, verifyOwnership],
  },

  oneMiddle: {
    middlewares: [authenticateUser, verifyOwnership],
  }
  // Ajouter d'autres groupes si nécessaire
};

// Middleware dynamique pour gérer les chemins en fonction des groupes
export function dynamicAuthMiddleware(req: RequestwithUser, res: Response, next: NextFunction, middle: string): void {

  // Parcourir chaque groupe
  for (const groupName in pathGroups) {
    const group = pathGroups[groupName];

    if (groupName === middle) {
      // Appliquer les middlewares du groupe
      group.middlewares.forEach(middleware => middleware(req, res, next));
      return;
    }
  }

  // Aucun groupe trouvé pour ce chemin, passer à l'étape suivante.
  next();
}
