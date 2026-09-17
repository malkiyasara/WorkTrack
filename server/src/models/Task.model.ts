import mongoose, { Document, Schema, Types } from "mongoose";
import { TASK_STATUS, TaskStatusType } from "../utils/constants.js";
import { calculatePriority } from "../utils/priorityHelper.js";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatusType;
    dueDate?: Date;
    user: Types.ObjectId;
    deadlineReminderSent?: boolean;
    priority?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(TASK_STATUS),
            default: TASK_STATUS.PENDING,
        },
        dueDate: {
            type: Date,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deadlineReminderSent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

taskSchema.virtual("priority").get(function (this: ITask) {
    return calculatePriority(this.dueDate);
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
