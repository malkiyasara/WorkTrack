import Task from "../models/Task.model.js";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants.js";

export const getDashboardData = async (userId: any) => {
    const totalTasks = await Task.countDocuments({
        user: userId,
    });

    const completedTasks = await Task.countDocuments({
        user: userId,
        status: TASK_STATUS.COMPLETED,
    });

    const pendingTasks = await Task.countDocuments({
        user: userId,
        status: TASK_STATUS.PENDING,
    });

    const highPriorityTasks = await Task.countDocuments({
        user: userId,
        priority: TASK_PRIORITY.HIGH,
    });

    const productivityScore =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        highPriorityTasks,
        productivityScore,
    };
};
