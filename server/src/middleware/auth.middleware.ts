import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User.model.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { USER_ROLES } from "../utils/constants.js";

export interface AuthRequest extends Request {
    user?: IUser | null;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let token: string | undefined;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decoded = verifyAccessToken(token);

            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
            }

            next();
        } else {
            res.status(401);
            throw new Error("Not authorized, token missing");
        }
    } catch (error) {
        res.status(401);
        next(error);
    }
};

export const admin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    if (req.user && req.user.role === USER_ROLES.ADMIN) {
        next();
    } else {
        res.status(403);
        throw new Error("Admin access only");
    }
};
