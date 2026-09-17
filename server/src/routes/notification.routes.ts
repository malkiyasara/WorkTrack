import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    getNotifications,
    markRead,
    deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.patch("/:id/read", markRead);
router.delete("/:id", deleteNotification);

export default router;
