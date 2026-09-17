import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../controllers/profile.controller.js";
import validate from "../middleware/validation.middleware.js";
import {
    updateProfileSchema,
    changePasswordSchema,
} from "../validations/profile.validation.js";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put("/", validate(updateProfileSchema), updateProfile);
router.put("/change-password", validate(changePasswordSchema), changePassword);

export default router;
