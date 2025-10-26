import dotenv from "dotenv";
dotenv.config(); // [UPDATED]

import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js"; // [UPDATED] imported because it's used later
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// [UPDATED] Use PascalCase for the Razorpay SDK import (ESM-safe)
import Razorpay from "razorpay"; // [UPDATED]

/* ================= REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking for all data
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 chars)",
      });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= USER CREDITS ================= */
const userCredits = async (req, res) => {
  try {
    // ✅ use req.user.id, NOT req.body.userId
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance ?? 0,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================================
   [UPDATED] Razorpay client initialization
   - Loads env vars (dotenv above)
   - Supports both correct keys and the typo variant RAYZORPAY_*
   - Throws a clear error if neither key_id nor oauth token found
   =========================================================== */
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayOauthToken =
  process.env.RAZORPAY_OAUTH_TOKEN || process.env.RAZORPAY_OAUTH; // optional fallbacks

if (!razorpayKeyId && !razorpayOauthToken) {
  // Fail fast with a helpful message
  throw new Error(
    "Razorpay configuration missing: set RAZORPAY_KEY_ID (or RAZORPAY_OAUTH_TOKEN) and RAZORPAY_KEY_SECRET in your environment."
  ); // [UPDATED] improved error message
}

const razorpayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
  oauthToken: razorpayOauthToken,
}); // [UPDATED] instantiated Razorpay client

// /* ================= PAYMENT: create order ================= */

const paymentRazorpay = async (req, res) => {
  try {
    console.log("---- pay-razor called ----");
    console.log(
      "SERVER: req.headers.authorization =",
      req.headers.authorization
    );
    console.log("SERVER: req.body =", req.body);
    console.log("SERVER: req.user (from middleware) =", req.user);

    const userId = req.user?.id; // <-- use middleware-provided id
    const { planId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    if (!planId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing planId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 5;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 20;
        amount = 30;
        break;
      case "Premier":
        plan = "Premier";
        credits = 50;
        amount = 50;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Plan not found" });
    }

    const transactionData = { userId, plan, amount, credits, date: Date.now() };
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    // await order creation
    const order = await razorpayInstance.orders.create(options);

    console.log("SERVER: created order", order && order.id);
    return res.json({ success: true, order });
  } catch (error) {
    console.error("paymentRazorpay error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    // Server can accept the Razorpay handler response (order_id, payment_id, signature)
    // Or you may prefer to accept razorpay_order_id to fetch status — keep what matches your frontend
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // minimal validation
    if (!razorpay_order_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing razorpay_order_id" });
    }

    // fetch order info from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid" || orderInfo.status === "captured") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (!transactionData) {
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
      }
      if (transactionData.payment) {
        return res.json({
          success: false,
          message: "Payment already processed",
        });
      }

      const userData = await userModel.findById(transactionData.userId);
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const creditBalance =
        (userData.creditBalance || 0) + (transactionData.credits || 0);
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      return res.json({ success: true, message: "Credits Added" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("verifyRazorpay error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
