import * as bcrypt from 'bcrypt';
export const generateHash = async (password, saltRounds = 9) => {
    try {
        // console.log("password : ",  password)
        // console.log("saltRounds : ",  saltRounds)
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const verifyHash = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash);
        // console.log("result : ", result)
        return result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
