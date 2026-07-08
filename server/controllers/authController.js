import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/* ===========================
   SEND OTP
=========================== */
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expires = new Date(
      Date.now() + 5 * 60 * 1000
    );

    db.query(
      `INSERT INTO otp_verifications
      (email, otp, expires_at)
      VALUES (?, ?, ?)`,
      [email, otp, expires],
      async (err) => {
        if (err) {
          console.log("OTP Error:", err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        const transporter =
          nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Farm2Home OTP Verification",
          text: `Your OTP is ${otp}`,
        });

        res.json({
          success: true,
          message: "OTP Sent Successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   VERIFY OTP
=========================== */
export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  db.query(
    `SELECT * FROM otp_verifications
     WHERE email=? AND otp=?
     ORDER BY id DESC
     LIMIT 1`,
    [email, otp],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      const row = result[0];

      if (
        new Date(row.expires_at) <
        new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "OTP Expired",
        });
      }

      res.json({
        success: true,
        message: "Email Verified",
      });
    }
  );
};

/* ===========================
   SIGNUP
=========================== */
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      farm_name,
      farm_location,
    } = req.body;

    const table =
      role === "farmer"
        ? "farmers"
        : "customers";

    db.query(
      `SELECT * FROM ${table} WHERE email=?`,
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        const hashedPassword =
          await bcrypt.hash(password, 10);

        if (role === "farmer") {
          db.query(
            `INSERT INTO farmers
            (
              farmer_name,
              email,
              phone,
              password,
              farm_name,
              farm_location
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
              name,
              email,
              phone,
              hashedPassword,
              farm_name || "",
              farm_location || "",
            ],
            (err) => {
              if (err) {
                console.log(err);

                return res.status(500).json({
                  success: false,
                  message: err.message,
                });
              }

              res.status(201).json({
                success: true,
                message:
                  "Farmer Registered Successfully",
              });
            }
          );
        } else {
          db.query(
            `INSERT INTO customers
            (
              name,
              email,
              phone,
              password
            )
            VALUES (?, ?, ?, ?)`,
            [
              name,
              email,
              phone,
              hashedPassword,
            ],
            (err) => {
              if (err) {
                console.log(err);

                return res.status(500).json({
                  success: false,
                  message: err.message,
                });
              }

              res.status(201).json({
                success: true,
                message:
                  "Customer Registered Successfully",
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   LOGIN
=========================== */
export const login = (req, res) => {
  const {
    email,
    password,
    role,
  } = req.body;

  const table =
    role === "farmer"
      ? "farmers"
      : "customers";

  db.query(
    `SELECT * FROM ${table}
     WHERE email=?`,
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];

      const valid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!valid) {
        return res.status(400).json({
          success: false,
          message: "Wrong Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name:
            role === "farmer"
              ? user.farmer_name
              : user.name,
          email: user.email,
          role,
        },
      });
    }
  );
};
export const sendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    db.query(
      "SELECT * FROM customers WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            message: "Email Not Found",
          });
        }

        const otp = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        const expiresAt = new Date(
          Date.now() + 5 * 60 * 1000
        );

        db.query(
          `
          INSERT INTO otp_verifications
          (email, otp, expires_at)
          VALUES (?, ?, ?)
          `,
          [email, otp, expiresAt],
          async (err) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            const transporter =
              nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
                },
              });

            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Password Reset OTP",
              text: `Your OTP is ${otp}`,
            });

            res.json({
              success: true,
              message: "OTP Sent Successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const resetForgotPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    db.query(
      `
      SELECT *
      FROM otp_verifications
      WHERE email=? AND otp=?
      ORDER BY id DESC
      LIMIT 1
      `,
      [email, otp],
      async (err, result) => {

        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (result.length === 0) {
          return res.status(400).json({
            message: "Invalid OTP",
          });
        }

        const otpData = result[0];

        if (
          new Date(otpData.expires_at) <
          new Date()
        ) {
          return res.status(400).json({
            message: "OTP Expired",
          });
        }

        const hashedPassword =
          await bcrypt.hash(
            newPassword,
            10
          );

        db.query(
          `
          UPDATE customers
          SET password=?
          WHERE email=?
          `,
          [hashedPassword, email],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            res.json({
              success: true,
              message:
                "Password Reset Successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};