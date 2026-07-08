import express from "express";
import {
  signup,
  login,
  sendOTP,
  verifyOTP,
  sendForgotPasswordOTP,
  resetForgotPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/forgot-password/send-otp",
  sendForgotPasswordOTP
);

router.post(
  "/forgot-password/reset",
  resetForgotPassword
);

export default router;