// Server/index.js
import express from "express";
import http from "http";
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
dotenv.config();
const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://lotterybingoet.com', 'https://www.lotterybingoet.com'],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  allowEIO3: true,
  transports: ['polling', 'websocket'],
  path: '/socket.io',
  pingTimeout: 60000,
  pingInterval: 25000
});

// Socket.IO configuration
io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  // Handle joining rooms
  socket.on('joinRoom', data => {
    const {
      userId,
      gameId
    } = data;
    const roomId = `${gameId}_${userId}`;
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  // Handle number calls
  socket.on("numberCalled", data => {
    const {
      gameId,
      number,
      userId
    } = data;
    const roomId = `${gameId}_${userId}`;
    // Only emit to the specific user's room
    socket.to(roomId).emit("numberCalled", {
      number
    });
  });

  // Handle bet amount updates
  socket.on("betAmountUpdate", data => {
    const {
      gameId,
      betAmount,
      userId
    } = data;
    const roomId = `${gameId}_${userId}`;
    socket.to(roomId).emit("betAmountUpdate", {
      betAmount
    });
  });

  // Handle game type updates
  socket.on("gameTypeUpdate", data => {
    const {
      gameId,
      gameType,
      userId
    } = data;
    const roomId = `${gameId}_${userId}`;
    socket.to(roomId).emit("gameTypeUpdate", {
      gameType
    });
  });

  // Handle modal actions
  socket.on("modalAction", data => {
    const {
      gameId,
      action,
      userId
    } = data;
    const roomId = `${gameId}_${userId}`;
    socket.to(roomId).emit("modalAction", {
      action
    });
  });

  // Handle cartella sync
  socket.on("syncCartellas", data => {
    const {
      gameId,
      cartellas,
      userId
    } = data;
    const roomId = `${gameId}_${userId}`;
    socket.to(roomId).emit("syncCartellas", {
      cartellas
    });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
  socket.on('error', error => {
    console.error('Socket error:', error);
  });
});

// Connect to MongoDB database
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.log(err);
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://164.92.181.109:3000', 'https://lotterybingoet.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
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
    message
  });
});

// Important: Use server.listen instead of app.listen for Socket.IO
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});