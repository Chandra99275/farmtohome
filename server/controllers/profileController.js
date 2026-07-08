import db from "../config/db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

/* ==========================
   EMAIL CONFIG
========================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===================================================
                    CUSTOMER PROFILE
=================================================== */

export const getCustomerProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT id,name,email,phone,created_at
     FROM customers
     WHERE id=?`,
    [userId],
    (err, result) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      if (result.length === 0)
        return res.status(404).json({
          message: "Customer not found",
        });

      res.json({
        user: result[0],
      });
    }
  );
};

export const updateCustomerProfile = (
  req,
  res
) => {
  const userId = req.user.id;

  const { name, phone } = req.body;

  db.query(
    `UPDATE customers
     SET name=?, phone=?
     WHERE id=?`,
    [name, phone, userId],
    (err) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      res.json({
        message:
          "Profile Updated Successfully",
      });
    }
  );
};

/* ===================================================
                CUSTOMER EMAIL OTP
=================================================== */

export const sendEmailChangeOTP =
  async (req, res) => {
    try {
      const { newEmail } = req.body;

      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      db.query(
        `
        INSERT INTO otp_verifications
        (email,otp,expires_at)
        VALUES(?,?,?)
        `,
        [newEmail, otp, expiresAt],
        async (err) => {
          if (err)
            return res.status(500).json({
              message: err.message,
            });

          await transporter.sendMail({
            from:
              process.env.EMAIL_USER,
            to: newEmail,
            subject:
              "Email Change OTP",
            text: `Your OTP is ${otp}`,
          });

          res.json({
            message:
              "OTP Sent Successfully",
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const verifyEmailChangeOTP = (
  req,
  res
) => {
  const userId = req.user.id;

  const { newEmail, otp } =
    req.body;

  db.query(
    `
    SELECT *
    FROM otp_verifications
    WHERE email=? AND otp=?
    ORDER BY id DESC
    LIMIT 1
    `,
    [newEmail, otp],
    (err, result) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      if (result.length === 0)
        return res.status(400).json({
          message: "Invalid OTP",
        });

      db.query(
        `
        UPDATE customers
        SET email=?
        WHERE id=?
        `,
        [newEmail, userId],
        (err) => {
          if (err)
            return res.status(500).json({
              message: err.message,
            });

          res.json({
            message:
              "Email Updated Successfully",
          });
        }
      );
    }
  );
};

/* ===================================================
              CUSTOMER PASSWORD OTP
=================================================== */

export const sendPasswordChangeOTP =
  (req, res) => {
    const userId = req.user.id;

    db.query(
      `
      SELECT email
      FROM customers
      WHERE id=?
      `,
      [userId],
      async (err, result) => {
        if (err)
          return res.status(500).json({
            message: err.message,
          });

        const email =
          result[0].email;

        const otp = Math.floor(
          100000 +
            Math.random() * 900000
        ).toString();

        const expiresAt = new Date(
          Date.now() +
            5 * 60 * 1000
        );

        db.query(
          `
          INSERT INTO otp_verifications
          (email,otp,expires_at)
          VALUES(?,?,?)
          `,
          [
            email,
            otp,
            expiresAt,
          ],
          async (err) => {
            if (err)
              return res
                .status(500)
                .json({
                  message:
                    err.message,
                });

            await transporter.sendMail(
              {
                from:
                  process.env
                    .EMAIL_USER,
                to: email,
                subject:
                  "Password OTP",
                text: `Your OTP is ${otp}`,
              }
            );

            res.json({
              message:
                "OTP Sent Successfully",
            });
          }
        );
      }
    );
  };

export const verifyPasswordChangeOTP =
  async (req, res) => {
    const userId = req.user.id;

    const { otp, newPassword } =
      req.body;

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    db.query(
      `
      UPDATE customers
      SET password=?
      WHERE id=?
      `,
      [hashedPassword, userId],
      (err) => {
        if (err)
          return res.status(500).json({
            message: err.message,
          });

        res.json({
          message:
            "Password Updated Successfully",
        });
      }
    );
  };

/* ===================================================
                    FARMER PROFILE
=================================================== */

export const getFarmerProfile = (
  req,
  res
) => {
  const farmerId = req.user.id;

  db.query(
    `
    SELECT
      id,
      farmer_name,
      email,
      phone,
      farm_name,
      farm_location,
      created_at
    FROM farmers
    WHERE id=?
    `,
    [farmerId],
    (err, result) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      if (result.length === 0)
        return res.status(404).json({
          message:
            "Farmer Not Found",
        });

      res.json({
        user: result[0],
      });
    }
  );
};

export const updateFarmerProfile = (
  req,
  res
) => {
  const farmerId = req.user.id;

  const {
    farmer_name,
    phone,
    farm_name,
    farm_location,
  } = req.body;

  db.query(
    `
    UPDATE farmers
    SET
      farmer_name=?,
      phone=?,
      farm_name=?,
      farm_location=?
    WHERE id=?
    `,
    [
      farmer_name,
      phone,
      farm_name,
      farm_location,
      farmerId,
    ],
    (err) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      res.json({
        message:
          "Farmer Profile Updated Successfully",
      });
    }
  );
};

/* ===================================================
              FARMER EMAIL OTP
=================================================== */

export const sendFarmerEmailOTP =
  sendEmailChangeOTP;

export const verifyFarmerEmailOTP = (
  req,
  res
) => {
  const farmerId = req.user.id;

  const { newEmail } = req.body;

  db.query(
    `
    UPDATE farmers
    SET email=?
    WHERE id=?
    `,
    [newEmail, farmerId],
    (err) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });

      res.json({
        message:
          "Farmer Email Updated Successfully",
      });
    }
  );
};

/* ===================================================
            FARMER PASSWORD OTP
=================================================== */

export const sendFarmerPasswordOTP =
  sendPasswordChangeOTP;

export const verifyFarmerPasswordOTP =
  async (req, res) => {
    const farmerId = req.user.id;

    const { newPassword } =
      req.body;

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    db.query(
      `
      UPDATE farmers
      SET password=?
      WHERE id=?
      `,
      [hashedPassword, farmerId],
      (err) => {
        if (err)
          return res.status(500).json({
            message: err.message,
          });

        res.json({
          message:
            "Farmer Password Updated Successfully",
        });
      }
    );
  };