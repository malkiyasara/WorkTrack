import { TASK_PRIORITY } from "./constants.js";

export const calculatePriority = (dueDate?: Date | string | null): string => {
    if (!dueDate) return TASK_PRIORITY.LOW;

    const today = new Date().getTime();
    const due = new Date(dueDate).getTime();

    const daysRemaining = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 2) return TASK_PRIORITY.HIGH;
    if (daysRemaining <= 7) return TASK_PRIORITY.MEDIUM;

    return TASK_PRIORITY.LOW;
};
