import cron from "node-cron";
import Task from "../models/Task.model.js";
import Notification from "../models/Notification.model.js";
import { TASK_STATUS, NOTIFICATION_TYPES, TASK_PRIORITY } from "./constants.js";

export const initDeadlineTracker = (): void => {
    cron.schedule("0 0 * * *", async () => {
        console.log("[Scheduler] Scanning database for urgent deadlines...");
        try {
            const activeTasks = await Task.find({
                status: { $ne: TASK_STATUS.COMPLETED },
                deadlineReminderSent: false,
                dueDate: { $exists: true, $ne: null },
            });

            for (const task of activeTasks) {
                if (task.priority === TASK_PRIORITY.HIGH) {
                    await Notification.create({
                        user: task.user,
                        type: NOTIFICATION_TYPES.DEADLINE_REMINDER,
                        title: "Urgent: High Priority Deadline",
                        message: `The task "${task.title}" is now critical and due within 48 hours.`,
                    });

                    task.deadlineReminderSent = true;
                    await task.save();
                }
            }
        } catch (error) {
            console.error("[Scheduler Error] Engine processing failed:", error);
        }
    });
};
