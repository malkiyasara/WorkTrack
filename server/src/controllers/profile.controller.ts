import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as profileService from "../services/profile.service.js";

export const getProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await profileService.getProfile(req.user!._id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = req.validatedData?.body || req.body;
        const user = await profileService.updateProfile(req.user._id, data);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { oldPassword, newPassword } = req.validatedData?.body || req.body;

        await profileService.changePassword(
            req.user._id,
            oldPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};
