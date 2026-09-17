import express from "express";
import { getUsers, getUser, deleteUser } from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { userIdSchema } from "../validations/user.validation.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, validate(userIdSchema), getUser);
router.delete("/:id", protect, admin, validate(userIdSchema), deleteUser);

export default router;
