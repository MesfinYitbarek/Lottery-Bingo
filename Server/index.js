// Server/index.js
import express from "express";
import http from "http";
import https from "https";
import { Server } from "socket.io";
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
import fs from "fs";


dotenv.config();
const __dirname = path.resolve();
const app = express();
// const server = http.createServer(app);
let server;
try {
  const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/lotterybingoet.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/lotterybingoet.com/privkey.pem')
  };
  server = https.createServer(options, app);
  console.log('HTTPS server created successfully');
} catch (error) {
  console.error('Error loading SSL certificates:', error.message);
  console.log('Falling back to HTTP server');
  server = http.createServer(app);
}

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a game room
  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
    console.log(`Client ${socket.id} joined game ${gameId}`);
    socket.to(gameId).emit("requestCartellaSync");
  });

  // Handle cartella selection
  socket.on("cartellaSelected", (data) => {
    const { gameId, number, selected } = data;
console.log ("Cartella selected:", data);
    socket.to(gameId).emit("cartellaSelected", { number, selected });
  });

  // Handle bet amount updates
 // Handle bet amount updates
socket.on("betAmountUpdate", (data) => {
  const { gameId, betAmount } = data;
  console.log("Bet amount update:", data);
  socket.to(gameId).emit("betAmountUpdate", { betAmount });
});

// Handle game type updates
socket.on("gameTypeUpdate", (data) => {
  const { gameId, gameType } = data;
  console.log("Game type update:", data);
  socket.to(gameId).emit("gameTypeUpdate", { gameType });
});

// Handle modal actions (clear, cancel, done)
socket.on("modalAction", (data) => {
  const { gameId, action } = data;
  console.log("Modal action:", data);
  socket.to(gameId).emit("modalAction", { action });
});

  // Handle bet amount changes


  // Handle cartella sync requests
  socket.on("syncCartellas", (data) => {
    const { gameId, selections, betAmount } = data;
    socket.to(gameId).emit("syncCartellas", { selections, betAmount });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

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

app.use(express.static(path.join(__dirname, '/LotteryBingo/build')));

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

// Important: Use server.listen instead of app.listen for Socket.IO
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});