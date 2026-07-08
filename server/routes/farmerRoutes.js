import express from "express";

import {
  saveFarmLocation,
  getFarmerLocation,
  getAllFarmerLocations
} from "../controllers/farmerController.js";

const router = express.Router();

// Save Farm Location
router.post("/save-location", saveFarmLocation);

// Get Single Farmer Location
router.get("/location/:id", getFarmerLocation);

// Get All Farmers Location
router.get("/locations", getAllFarmerLocations);

export default router;