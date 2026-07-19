import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controller/authController.js";
import { getUser, updateProfile } from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logoutUser);
router.patch(
  "/update-profile",
  verifyToken,
  upload.single("profileImage"),
  updateProfile,
);
router.post("/reset-password/:token", resetPassword);

export default router;
