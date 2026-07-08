import express from "express";
import upload from "../middleware/upload.js";

import {
  addProduct,
  getProducts,
  getFarmerProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* ==========================
   ADD PRODUCT WITH IMAGE
========================== */
router.post(
  "/add",
  upload.single("image"),
  addProduct
);

/* ==========================
   GET ALL PRODUCTS
========================== */
router.get(
  "/all",
  getProducts
);

/* ==========================
   GET FARMER PRODUCTS
========================== */
router.get(
  "/farmer/:farmerId",
  getFarmerProducts
);

/* ==========================
   DELETE PRODUCT
========================== */
router.delete(
  "/delete/:id",
  deleteProduct
);

export default router;