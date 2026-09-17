import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    updateStatus,
} from "../controllers/task.controller.js";
import validate from "../middleware/validation.middleware.js";
import {
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
    updateStatusSchema,
} from "../validations/task.validation.js";

const router = express.Router();

router.use(protect);

router
    .route("/")
    .post(validate(createTaskSchema), createTask)
    .get(getTasks);

router
    .route("/:id")
    .get(validate(taskIdSchema), getTask)
    .put(validate(updateTaskSchema), updateTask)
    .delete(validate(taskIdSchema), deleteTask);

router.patch("/:id/status", validate(updateStatusSchema), updateStatus);

export default router;
