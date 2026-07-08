import db from "../config/db.js";

/* ==========================
   ADD PRODUCT
========================== */
export const addProduct = (req, res) => {

  const {
    farmer_id,
    category_id,
    name,
    description,
    price,
    quantity,
    unit,
  } = req.body;

  const image =
    req.file ? req.file.filename : "";
  db.query(
    `
    INSERT INTO products
    (
      farmer_id,
      category_id,
      name,
      description,
      price,
      quantity,
      image,
      unit
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      farmer_id,
      category_id,
      name,
      description,
      price,
      quantity,
      image,
      unit,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        productId: result.insertId,
      });
    }
  );
};

/* ==========================
   GET ALL PRODUCTS
========================== */
export const getProducts = (req, res) => {
  db.query(
    `
    SELECT *
    FROM products
    ORDER BY id DESC
    `,
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        products: result,
      });
    }
  );
};

/* Alias for old code */
export const getAllProducts = getProducts;

/* ==========================
   GET FARMER PRODUCTS
========================== */
export const getFarmerProducts = (req, res) => {
  const { farmerId } = req.params;

  db.query(
    `
    SELECT *
    FROM products
    WHERE farmer_id = ?
    ORDER BY id DESC
    `,
    [farmerId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        products: result,
      });
    }
  );
};

/* ==========================
   DELETE PRODUCT
========================== */
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    DELETE FROM products
    WHERE id = ?
    `,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    }
  );
};