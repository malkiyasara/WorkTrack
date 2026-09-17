import Notification, { INotification } from "../models/Notification.model.js";
import { NotificationType } from "../utils/constants.js";

export const createNotification = async (
    userId: any,
    type: NotificationType,
    title: string,
    message: string
): Promise<INotification> => {
    return await Notification.create({
        user: userId,
        type,
        title,
        message,
    });
};

export const getNotifications = async (userId: any): Promise<INotification[]> => {
    return await Notification.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });
};

export const markAsRead = async (
    notificationId: string,
    userId: any
): Promise<INotification> => {
    const notification = await Notification.findOne({
        _id: notificationId,
        user: userId,
    });

    if (!notification) {
        throw new Error("Notification not found");
    }

    notification.isRead = true;

    await notification.save();

    return notification;
};

export const deleteNotification = async (
    notificationId: string,
    userId: any
): Promise<boolean> => {
    const notification = await Notification.findOne({
        _id: notificationId,
        user: userId,
    });

    if (!notification) {
        throw new Error("Notification not found");
    }

    await notification.deleteOne();

    return true;
};
