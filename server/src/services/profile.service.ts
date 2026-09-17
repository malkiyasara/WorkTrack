import User, { IUser } from "../models/User.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export const getProfile = async (userId: any): Promise<IUser | null> => {
    return await User.findById(userId).select("-password");
};

export const updateProfile = async (
    userId: any,
    data: { name?: string; email?: string }
): Promise<IUser> => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = data.name || user.name;
    user.email = data.email || user.email;

    await user.save();

    return user;
};

export const changePassword = async (
    userId: any,
    oldPassword: string,
    newPassword: string
): Promise<boolean> => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

    user.password = await hashPassword(newPassword);

    await user.save();

    return true;
};
