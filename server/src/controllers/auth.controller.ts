import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, password } = req.validatedData?.body || req.body;

        const user = await registerUser(name, email, password);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.validatedData?.body || req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    res.status(200).json({
        success: true,
        message: "Logout Successful",
    });
};
