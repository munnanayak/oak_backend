import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

// Route for handling checkout
router.post("/checkout", checkout);

// Route for handling payment verification
router.post("/paymentverification", paymentVerification);

export default router;
