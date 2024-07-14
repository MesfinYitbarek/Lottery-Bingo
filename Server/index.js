import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import mongoose from "mongoose";
import cardRouter from "./routes/cards.js";
import creditRouter from "./routes/credit.js";
import salesRouter from "./routes/sales.js";
import branchRouter from "./routes/Agent.js";
// Connect to MongoDB database
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();


//mongodb+srv://mesfinyitbarek55:12348109@lotterybingo.knjysl9.mongodb.net/?retryWrites=true&w=majority&appName=LotteryBingo

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);
app.use("/api/credit", creditRouter);
app.use("/api/sales", salesRouter);
app.use("/api/branch", branchRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(4000, () => {
    console.log(`App is listening on port: 4000`);
  });