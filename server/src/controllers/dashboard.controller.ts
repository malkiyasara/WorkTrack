import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const dashboard = await getDashboardData(req.user!._id);

        res.status(200).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        next(error);
    }
};
