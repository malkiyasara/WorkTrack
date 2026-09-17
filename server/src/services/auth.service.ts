import User, { IUser } from "../models/User.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<IUser> => {
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
        id: any;
        name: string;
        email: string;
        role: string;
    };
}> => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Email or Password");
    }

    user.lastLogin = new Date();
    await user.save();

    return {
        accessToken: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
