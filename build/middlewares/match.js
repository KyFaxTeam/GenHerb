"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicAuthMiddleware = void 0;
const auth_1 = require("./auth");
// Définir les groupes de chemins et les middlewares correspondants
const pathGroups = {
    twoMiddle: {
        middlewares: [auth_1.authenticateUser, auth_1.verifyOwnership],
    },
    oneMiddle: {
        middlewares: [auth_1.authenticateUser, auth_1.verifyOwnership],
    }
    // Ajouter d'autres groupes si nécessaire
};
// Middleware dynamique pour gérer les chemins en fonction des groupes
function dynamicAuthMiddleware(req, res, next, middle) {
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
exports.dynamicAuthMiddleware = dynamicAuthMiddleware;
