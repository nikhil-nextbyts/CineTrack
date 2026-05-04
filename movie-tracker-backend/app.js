import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { testConnection } from "./config/db.js";
import {
  runDailyNotifications,
  runWeeklyNotifications,
} from "./services/notificationService.js";

import dailyJob from "./jobs/dailyJob.js";
import weeklyJob from "./jobs/weeklyJob.js";

const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware — logs every inbound request for Railway visibility
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} — ${Date.now() - start}ms`,
    );
  });
  next();
});

// Health check — responds immediately, no async work
app.get("/", (req, res) =>
  res.json({ status: "ok", message: "CineTrack API running 🎬" }),
);
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/test-daily", async (req, res) => {
  await runDailyNotifications();
  res.json({ message: "Daily notifications sent" });
});

app.get("/test-weekly", async (req, res) => {
  await runWeeklyNotifications();
  res.json({ message: "Weekly notifications sent" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/notify", notificationRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start cron jobs
dailyJob.start();
weeklyJob.start();
console.log("Cron jobs scheduled ✅");

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  // Probe the DB after the HTTP server is already accepting connections so a
  // slow database never delays Railway's healthcheck from passing.
  testConnection();
});

server.on("error", (err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});

// Catch unhandled promise rejections — prevents silent crashes
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});

// Catch uncaught synchronous exceptions — prevents silent crashes
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});
