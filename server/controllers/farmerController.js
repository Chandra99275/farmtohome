import db from "../config/db.js";

/* =======================================================
   SAVE FARM LOCATION
   POST /api/farmer/save-location
======================================================= */

export const saveFarmLocation = (req, res) => {
  const { farmerId, latitude, longitude } = req.body;

  if (!farmerId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql = `
    UPDATE farmers
    SET latitude = ?, longitude = ?
    WHERE id = ?
  `;

  db.query(sql, [latitude, longitude, farmerId], (err, result) => {
    if (err) {
      console.log("Database Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    res.json({
      success: true,
      message: "Farm location saved successfully",
    });
  });
};

/* =======================================================
   GET SAVED FARM LOCATION
   GET /api/farmer/location/:id
======================================================= */

export const getFarmerLocation = (req, res) => {
  const farmerId = req.params.id;

  const sql = `
    SELECT latitude, longitude
    FROM farmers
    WHERE id = ?
  `;

  db.query(sql, [farmerId], (err, rows) => {
    if (err) {
      console.log("Database Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    if (
      rows[0].latitude === null ||
      rows[0].longitude === null
    ) {
      return res.json({
        success: true,
        location: null,
      });
    }

    res.json({
      success: true,
      location: {
        latitude: Number(rows[0].latitude),
        longitude: Number(rows[0].longitude),
      },
    });
  });
};
/* =======================================================
   GET ALL FARMERS LOCATION
   GET /api/farmer/locations
======================================================= */

export const getAllFarmerLocations = (req, res) => {

  const sql = `
    SELECT
      id,
      name,
      phone,
      address,
      latitude,
      longitude
    FROM farmers
    WHERE latitude IS NOT NULL
      AND longitude IS NOT NULL
  `;

  db.query(sql, (err, rows) => {

    if (err) {
      console.log("Database Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.status(200).json({
      success: true,
      farmers: rows,
    });

  });

};