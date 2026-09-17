import mongoose, { Document, Schema, Types } from "mongoose";
import { NOTIFICATION_TYPES, NotificationType } from "../utils/constants.js";

export interface INotification extends Document {
    user: Types.ObjectId;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(NOTIFICATION_TYPES),
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model<INotification>(
    "Notification",
    notificationSchema
);

export default Notification;
