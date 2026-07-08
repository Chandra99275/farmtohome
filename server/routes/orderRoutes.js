import express from "express";

import {
  placeOrder,
  getCustomerOrders,
  getFarmerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);

router.get(
  "/customer/:customerId",
  getCustomerOrders
);

router.get(
  "/farmer/:farmerId",
  getFarmerOrders
);

router.put(
  "/status/:id",
  updateOrderStatus
);
router.get(
  "/customer/:customerId",
  getCustomerOrders
);

export default router;