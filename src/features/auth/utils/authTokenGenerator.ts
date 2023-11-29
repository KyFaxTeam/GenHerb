import * as jwt from 'jsonwebtoken';
import { User } from '../entities';
import config from '../../../config';


const secretKey = config.secretKey;

const generateBasePayload = (user: User): Record<string, any> => {
  return {
    userId: user.id,
    email: user.email,
  };
}

export const generateToken = (user: User): string => {
  const payload = generateBasePayload(user);

  const options = {
    expiresIn: '1h', 
  };

  return jwt.sign(payload, secretKey, options);
  
}


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

export const generateResetPasswordToken = (user: User): string => {

  const payload = generateBasePayload(user);

  const options = {
    expiresIn: '10mn', 
  };

  return jwt.sign(payload, secretKey, options);
}

export const generateEmailVerificationToken = (user: User): string => {
  const payload = generateBasePayload(user);

  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, secretKey, options);
}


export const isverifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, secretKey, { ignoreExpiration: true });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const returnvalidateUser = (token: string): User| null => {
  try {
    const decodedToken: any = jwt.verify(token, secretKey, { ignoreExpiration: false });
    return decodedToken.user
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getPayload = (token: string): any | null => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken?.payload || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// const getTokenFromHeader = (req) => {
//   const { authorization } = req.headers;
//   if (
//     (authorization && authorization.split(' ')[0] === 'Token') ||
//     (authorization && authorization.split(' ')[0] === 'Bearer')
//   ) {
//     return authorization.split(' ')[1];
//   }
//   // tslint:disable-next-line: no-null-keyword
//   return null;
// };


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
