export const createSafeUser = (user) => {
    const { password, token, accessToken, ...safeUser } = user;
    return safeUser;
};
