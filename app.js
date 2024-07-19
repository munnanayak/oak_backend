// app.js
import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRouters.js";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
app.use("/api/v1", paymentRoutes);

app.get('/api/getkey', (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server is working on ${PORT}`);
// });

export { app };
