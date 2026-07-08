import db from "../config/db.js";
import { io } from "../server.js";

/* ==========================
   PLACE ORDER
========================== */
export const placeOrder = (req, res) => {
  const {
    customer_id,
    items,
    total_amount,
    payment_method
  } = req.body;

  db.query(
    `
    INSERT INTO orders
    (
      customer_id,
      total_amount,
      payment_method
    )
    VALUES (?,?,?)
    `,
    [
      customer_id,
      total_amount,
      payment_method || "COD"
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      const orderId = result.insertId;

      items.forEach((item) => {

        const subtotal =
          item.price * item.quantity;

        db.query(
          `
          INSERT INTO order_items
          (
            order_id,
            product_id,
            farmer_id,
            quantity,
            price,
            subtotal
          )
          VALUES (?,?,?,?,?,?)
          `,
          [
            orderId,
            item.product_id,
            item.farmer_id,
            item.quantity,
            item.price,
            subtotal
          ]
        );

        db.query(
          `
          UPDATE products
          SET quantity = quantity - ?
          WHERE id = ?
          `,
          [
            item.quantity,
            item.product_id
          ]
        );
      });
io.emit("newOrder");
      res.json({
        success: true,
        message: "Order Placed Successfully",
        orderId
      });
    }
  );
};

/* ==========================
   CUSTOMER ORDERS
========================== */
export const getCustomerOrders = (
  req,
  res
) => {

  const { customerId } =
    req.params;

  db.query(
    `
    SELECT
      o.id,
      o.total_amount,
      o.order_status,
      o.payment_status,
      o.created_at,
      oi.product_id,
      oi.quantity,
      oi.price,
      oi.subtotal,
      p.name AS product_name,
      p.image
    FROM orders o
    JOIN order_items oi
      ON o.id = oi.order_id
    JOIN products p
      ON p.id = oi.product_id
    WHERE o.customer_id = ?
    ORDER BY o.id DESC
    `,
    [customerId],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.json({
        success: true,
        orders: result
      });
    }
  );
};

/* ==========================
   FARMER ORDERS
========================== */
export const getFarmerOrders = (
  req,
  res
) => {

  const { farmerId } =
    req.params;

  db.query(
    `
    SELECT
      oi.*,
      o.customer_id,
      o.order_status,
      o.payment_status,
      o.created_at,
      p.name AS product_name,
      p.image
    FROM order_items oi
    JOIN orders o
      ON oi.order_id = o.id
    JOIN products p
      ON oi.product_id = p.id
    WHERE oi.farmer_id = ?
    ORDER BY oi.id DESC
    `,
    [farmerId],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.json({
        success: true,
        orders: result
      });
    }
  );
};

/* ==========================
   UPDATE ORDER STATUS
========================== */
export const updateOrderStatus = (
  req,
  res
) => {

  const orderId =
    req.params.id;

  const { status } =
    req.body;

  db.query(
    `
    UPDATE orders
    SET order_status = ?
    WHERE id = ?
    `,
    [status, orderId],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
io.emit("orderUpdated");
      res.json({
        success: true,
        message:
          "Order Status Updated Successfully"
      });
    }
  );
};