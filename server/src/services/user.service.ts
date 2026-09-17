import User, { IUser } from "../models/User.model.js";

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find().select("-password").sort({
        createdAt: -1,
    });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password");
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    await user.deleteOne();

    return true;
};
