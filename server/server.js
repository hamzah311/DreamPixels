// // index.js (or server.js) — UPDATED: load env immediately
import 'dotenv/config'; // [UPDATED] must be first so other imports see process.env

import express from "express";
import cors from "cors";
// import dotenv from "dotenv"; // removed
import connectDB from "./config/mongodb.js";
import imageRouter from "./routes/imageRoutes.js";
import userRouter from "./routes/userRoutes.js";

const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Wrap server start in async function
const startServer = async () => {
  try {
    // Check MongoDB URL before connecting
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URL not found in .env file!");
    }
    console.log("🔗 Connecting to MongoDB...");
    // (optional) hide full URI in prod logs
    console.log("MongoDB URL present:", !!process.env.MONGODB_URI);

    await connectDB();

    // Routes
    app.use("/api/user", userRouter);
    app.use('/api/image', imageRouter);
    app.get("/", (req, res) => {
      res.send("API Working");
    });

    // Start server
    app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
    process.exit(1); // Exit with failure
  }
};

startServer();
