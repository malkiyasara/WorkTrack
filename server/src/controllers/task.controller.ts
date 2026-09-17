import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as taskService from "../services/task.service.js";

export const createTask = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const taskData = req.validatedData?.body || req.body;
        const task = await taskService.createTask(taskData, req.user._id);

        res.status(201).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tasks = await taskService.getTasks(req.user!._id, req.query as any);

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const getTask = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const taskId = req.validatedData?.params?.id || req.params.id;
        const task = await taskService.getTaskById(taskId, req.user._id);

        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const task = await taskService.updateTask(taskId, taskData, req.user._id);

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const taskId = req.validatedData?.params?.id || req.params.id;
        await taskService.deleteTask(taskId, req.user._id);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const taskId = req.validatedData?.params?.id || req.params.id;
        const status = req.validatedData?.body?.status || req.body.status;
        const task = await taskService.updateTaskStatus(taskId, status, req.user._id);

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};
