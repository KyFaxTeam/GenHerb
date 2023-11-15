import * as jwt from 'jsonwebtoken';
import { User } from '../entities';
import config from '../../../config';

export class AuthTokenGenerator {
  private secretKey: string;

  constructor() {
    this.secretKey = config.secretKey;
  }

  private generateBasePayload(user: User): Record<string, any> {
    return {
      userId: user.id,
      email: user.email,
    };
  }

  generateToken(user: User): string {
    const payload = this.generateBasePayload(user);

    const options = {
      expiresIn: '1h', 
    };

    return jwt.sign(payload, this.secretKey, options);
    
  }
  

  generateResetPasswordToken(user: User): string {

    const payload = this.generateBasePayload(user);
  
    const options = {
      expiresIn: '10mn', 
    };
  
    return jwt.sign(payload, this.secretKey, options);
  }

  generateEmailVerificationToken(user: User): string {
    const payload = this.generateBasePayload(user);
  
    const options = {
      expiresIn: '24h',
    };
  
    return jwt.sign(payload, this.secretKey, options);
  }
  

  isverifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey, { ignoreExpiration: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  returnvalidateUserId(token: string): string | number | null {
    try {
      const decodedToken: any = jwt.verify(token, this.secretKey, { ignoreExpiration: false });
      return decodedToken.userId
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getPayload(token: string): any | null {
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      return decodedToken?.payload || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

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
  
  
}
