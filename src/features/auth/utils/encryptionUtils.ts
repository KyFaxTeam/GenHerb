import * as bcrypt from 'bcrypt';

export const generateHash = async (password: string, saltRounds: number): Promise<string> => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash as string;
  } catch (error) {
    console.log(error);
    throw error;

  }
};

export const verifyHash = async (password: string, hash: string): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result as boolean;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};
