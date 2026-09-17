import { Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";

export const getUsers = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.validatedData?.params?.id || req.params.id;
        const user = await userService.getUserById(id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.validatedData?.params?.id || req.params.id;
        await userService.deleteUser(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
