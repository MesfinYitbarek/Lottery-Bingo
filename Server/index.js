// Server/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import mongoose from "mongoose";
import cardRouter from "./routes/cards.js";
import creditRouter from "./routes/credit.js";
import salesRouter from "./routes/sales.js";
import branchRouter from "./routes/Agent.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const app = express();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);
app.use("/api/credit", creditRouter);
app.use("/api/sales", salesRouter);
app.use("/api/branch", branchRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/LotteryBingo/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'LotteryBingo', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});