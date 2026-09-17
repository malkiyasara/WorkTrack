import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as notificationService from "../services/notification.service.js";

export const getNotifications = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const notifications = await notificationService.getNotifications(
            req.user!._id
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });
    } catch (error) {
        next(error);
    }
};

export const markRead = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const notification = await notificationService.markAsRead(
            req.params.id as string,
            req.user!._id
        );

        res.status(200).json({
            success: true,
            notification,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await notificationService.deleteNotification(
            req.params.id as string,
            req.user!._id
        );

        res.status(200).json({
            success: true,
            message: "Notification deleted",
        });
    } catch (error) {
        next(error);
    }
};
