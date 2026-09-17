import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getSecret = (secret?: string): Secret => {
    return (secret || "secret") as Secret;
};

export const generateAccessToken = (userId: string | object): string => {
    const secret = getSecret(process.env.JWT_SECRET);
    return jwt.sign({ userId }, secret, {
        expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as any,
    });
};

export const generateRefreshToken = (userId: string | object): string => {
    const secret = getSecret(process.env.JWT_REFRESH_SECRET);
    return jwt.sign({ userId }, secret, {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as any,
    });
};

export const verifyAccessToken = (token: string): any => {
    const secret = getSecret(process.env.JWT_SECRET);
    return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token: string): any => {
    const secret = getSecret(process.env.JWT_REFRESH_SECRET);
    return jwt.verify(token, secret);
};
