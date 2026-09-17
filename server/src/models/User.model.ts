import mongoose, { Document, Schema } from "mongoose";
import { USER_ROLES, UserRoleType } from "../utils/constants.js";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: UserRoleType;
    lastLogin?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.USER,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
