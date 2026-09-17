import Task, { ITask } from "../models/Task.model.js";
import Notification from "../models/Notification.model.js";
import { TASK_STATUS, NOTIFICATION_TYPES, TASK_PRIORITY, TaskStatusType } from "../utils/constants.js";

export const createTask = async (taskData: Partial<ITask>, userId: any): Promise<ITask> => {
    const task = await Task.create({
        ...taskData,
        user: userId,
    });

    await Notification.create({
        user: userId,
        type: NOTIFICATION_TYPES.TASK_CREATED,
        title: "Task Created",
        message: `${task.title} was created successfully.`,
    });

    return task;
};

export const getTasks = async (
    userId: any,
    filters: { status?: string; search?: string; priority?: string } = {}
): Promise<ITask[]> => {
    const query: any = {
        user: userId,
    };

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.search) {
        query.title = {
            $regex: filters.search,
            $options: "i",
        };
    }

    let tasks = await Task.find(query).sort({
        createdAt: -1,
    });

    if (filters.priority) {
        tasks = tasks.filter((task) => task.priority === filters.priority);
    }

    return tasks;
};

export const getTaskById = async (
    taskId: string,
    userId: any
): Promise<ITask | null> => {
    return await Task.findOne({
        _id: taskId,
        user: userId,
    });
};

export const updateTask = async (
    taskId: string,
    taskData: Partial<ITask>,
    userId: any
): Promise<ITask> => {
    const task = await Task.findOne({
        _id: taskId,
        user: userId,
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const oldPriority = task.priority;

    if (
        taskData.dueDate &&
        task.dueDate &&
        new Date(taskData.dueDate).getTime() !== new Date(task.dueDate).getTime()
    ) {
        task.deadlineReminderSent = false;
    }

    Object.assign(task, taskData);

    await task.save();

    const newPriority = task.priority;

    if (oldPriority !== TASK_PRIORITY.HIGH && newPriority === TASK_PRIORITY.HIGH) {
        if (!task.deadlineReminderSent) {
            await Notification.create({
                user: userId,
                type: NOTIFICATION_TYPES.DEADLINE_REMINDER,
                title: "Urgent: High Priority Deadline",
                message: `The task "${task.title}" shifted close to its deadline and is now High Priority.`,
            });
            task.deadlineReminderSent = true;
            await task.save();
        }
    } else {
        await Notification.create({
            user: userId,
            type: NOTIFICATION_TYPES.TASK_UPDATED,
            title: "Task Updated",
            message: `${task.title} was updated successfully.`,
        });
    }
    return task;
};

export const deleteTask = async (
    taskId: string,
    userId: any
): Promise<boolean> => {
    const task = await Task.findOne({
        _id: taskId,
        user: userId,
    });

    if (!task) {
        throw new Error("Task not found");
    }

    await Notification.create({
        user: userId,
        type: NOTIFICATION_TYPES.TASK_DELETED,
        title: "Task Deleted",
        message: `${task.title} was deleted.`,
    });

    await task.deleteOne();

    return true;
};

export const updateTaskStatus = async (
    taskId: string,
    status: TaskStatusType,
    userId: any
): Promise<ITask> => {
    const task = await Task.findOne({
        _id: taskId,
        user: userId,
    });

    if (!task) {
        throw new Error("Task not found");
    }

    task.status = status;

    await task.save();

    if (status === TASK_STATUS.COMPLETED) {
        await Notification.create({
            user: userId,
            type: NOTIFICATION_TYPES.TASK_COMPLETED,
            title: "Task Completed",
            message: `${task.title} has been completed.`,
        });
    } else if (
        task.priority === TASK_PRIORITY.HIGH &&
        !task.deadlineReminderSent
    ) {
        await Notification.create({
            user: userId,
            type: NOTIFICATION_TYPES.DEADLINE_REMINDER,
            title: "Urgent: High Priority Deadline",
            message: `The active task "${task.title}" is currently flagged as High Priority.`,
        });
        task.deadlineReminderSent = true;
        await task.save();
    }
    return task;
};
