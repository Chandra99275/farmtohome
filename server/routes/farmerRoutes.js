import express from "express";

import {
  saveFarmLocation
} from "../controllers/farmerController.js";


const router = express.Router();



router.post(
  "/save-location",
  saveFarmLocation
);



export default router;