// import express from "express";
// import paypal from "@paypal/checkout-server-sdk";

// const router = express.Router();

// // Sandbox environment
// const environment = new paypal.core.SandboxEnvironment(
//   "YOUR_SANDBOX_CLIENT_ID",
//   "YOUR_SANDBOX_CLIENT_SECRET"
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// router.post("/create-order", async (req, res) => {
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.prefer("return=representation");
//   request.requestBody({
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: req.body.amount, // e.g. "10.00"
//         },
//       },
//     ],
//   });

//   try {
//     const order = await client.execute(request);
//     res.json({ id: order.result.id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Error creating PayPal order" });
//   }
// });

// export default router;



















// import express from "express";
// import paypal from "@paypal/checkout-server-sdk";

// const router = express.Router();

// // Sandbox environment (use your own sandbox client ID and secret)
// const environment = new paypal.core.SandboxEnvironment(
//   process.env.PAYPAL_CLIENT_ID,
//   process.env.PAYPAL_CLIENT_SECRET
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// router.post("/create-order", async (req, res) => {
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.prefer("return=representation");
//   request.requestBody({
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD", // ✅ PayPal sandbox defaults to USD
//           value: req.body.amount, // e.g. "10.00"
//         },
//       },
//     ],
//   });

//   try {
//     const order = await client.execute(request);
//     res.json({ id: order.result.id }); // ✅ return order ID to frontend
//   } catch (err) {
//     console.error("PayPal order creation error:", err);
//     res.status(500).json({ msg: "Error creating PayPal order" });
//   }
// });

// export default router;

import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

const razorpay =
  razorpayKeyId && razorpayKeySecret
    ? new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      })
    : null;

router.post("/create-order", async (req, res) => {
  if (!razorpay) {
    return res.status(500).json({
      msg: "Razorpay is not configured on server",
    });
  }

  const parsedAmount = Number(req.body?.amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ msg: "Invalid amount" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: razorpayKeyId,
      gateway: "razorpay",
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    const details =
      err?.error?.description || err?.message || "Unknown Razorpay API error";
    res.status(500).json({ msg: "Error creating Razorpay order", details });
  }
});

export default router;
