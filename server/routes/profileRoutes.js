import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

import {
  getCustomerProfile,
  updateCustomerProfile,
  sendEmailChangeOTP,
  verifyEmailChangeOTP,
  sendPasswordChangeOTP,
  verifyPasswordChangeOTP,

  getFarmerProfile,
  updateFarmerProfile,
  sendFarmerEmailOTP,
  verifyFarmerEmailOTP,
  sendFarmerPasswordOTP,
  verifyFarmerPasswordOTP



  
} from "../controllers/profileController.js";

const router = express.Router();
// FARMER PROFILE

router.get(
  "/farmer",
  verifyToken,
  getFarmerProfile
);

router.put(
  "/farmer",
  verifyToken,
  updateFarmerProfile
);

router.post(
  "/farmer/send-email-change-otp",
  verifyToken,
  sendFarmerEmailOTP
);

router.post(
  "/farmer/verify-email-change-otp",
  verifyToken,
  verifyFarmerEmailOTP
);

router.post(
  "/farmer/send-password-change-otp",
  verifyToken,
  sendFarmerPasswordOTP
);

router.post(
  "/farmer/verify-password-change-otp",
  verifyToken,
  verifyFarmerPasswordOTP
);

router.get(
  "/customer",
  verifyToken,
  getCustomerProfile
);

router.put(
  "/customer",
  verifyToken,
  updateCustomerProfile
);

router.post(
  "/send-email-change-otp",
  verifyToken,
  sendEmailChangeOTP
);

router.post(
  "/verify-email-change-otp",
  verifyToken,
  verifyEmailChangeOTP
);

router.post(
  "/send-password-change-otp",
  verifyToken,
  sendPasswordChangeOTP
);

router.post(
  "/verify-password-change-otp",
  verifyToken,
  verifyPasswordChangeOTP
);

export default router;