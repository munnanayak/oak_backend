import { instance } from '../server.js';
import crypto from 'crypto';
import { Payment } from '../models/paymentModel.js';

export const checkout = async (req, res) => {
  const { amount } = req.body;  // Extract amount from request body

  if (!amount) {
    return res.status(400).json({ success: false, error: "Amount is required" });
  }

  const options = {
    amount: Number(amount * 100), // Convert to paisa
    currency: 'INR',
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET) // Correct usage here
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Save to database
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
