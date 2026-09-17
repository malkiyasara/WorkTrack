export const TASK_STATUS = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
} as const;

export type TaskStatusType = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export const TASK_PRIORITY = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
} as const;

export type TaskPriorityType = typeof TASK_PRIORITY[keyof typeof TASK_PRIORITY];

export const USER_ROLES = {
    ADMIN: "Admin",
    USER: "User",
} as const;

export type UserRoleType = typeof USER_ROLES[keyof typeof USER_ROLES];

export const NOTIFICATION_TYPES = {
    TASK_CREATED: "task_created",
    TASK_UPDATED: "task_updated",
    TASK_COMPLETED: "task_completed",
    TASK_DELETED: "task_deleted",
    TASK_ASSIGNED: "task_assigned",
    DEADLINE_REMINDER: "deadline_reminder",
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];
