import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

import businessAuthRoutes from "./Router/business/businessAuthRoutes.js";
import businessProfileRoutes from "./Router/business/businessProfileRoutes.js";
import businessProductRoutes from './Router/business/productRoutes.js';
import businessOrderRoutes from './Router/business/orderRoutes.js';
import reviewRoutes from './Router/business/reviewRoutes.js';
import customerAuthRoutes from './Router/business/customerAuthRoutes.js';
import { connectMongoClient } from "./Db/mongoClient.js";
import { connectMongoose } from "./Db/mongoose.js";
import AuthRoutes from "./Router/Auth/auth.routes.js";
import commonRoutes from "./Router/CommonRoutes/commonRouts.js";
import { generalLimiter } from "./Middleware/rateLimiter.js";

// Education Routes Imports
import EduAdminRoutes from "./Router/Education/Admin.js";
import EduClientRoutes from "./Router/Education/client.js";
import EduSuperAdminRoutes from "./Router/Education/SuperAdmin.js";
import OnlineCourseRoutes from "./Router/Education/OnlineCourse.js";

// Health Routes Imports
import healthClientRoutes from "./Router/Health/client.js";
import healthAdminRoutes from "./Router/Health/Admin.js";
import healthSuperAdminRoutes from "./Router/Health/superAdmin.js";
import foodClientRoutes from "./Router/Food/client.js";
import foodAdminRoutes from "./Router/Food/Admin.js";
import foodSARoutes from "./Router/Food/superAdmin.js";

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// ✅ Production Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://digital-kohat-indol.vercel.app"
];

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Create socket server
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

// ✅ Socket connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("join_superadmin", () => {
    socket.join("superadmin");
    console.log("Superadmin joined room");
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(generalLimiter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use(AuthRoutes);
app.use(commonRoutes);

// Education Sector Routes
app.use(EduSuperAdminRoutes)
app.use(EduAdminRoutes);
app.use(EduClientRoutes);
app.use(OnlineCourseRoutes);

// Health Sector Routes
app.use(healthClientRoutes);
app.use(healthAdminRoutes);
app.use(healthSuperAdminRoutes);

// Food Sector Routes
app.use(foodClientRoutes);
app.use(foodAdminRoutes);
app.use(foodSARoutes);

// Bussiness Sector Routes
app.use("/business/auth", businessAuthRoutes);
app.use("/business/profile", businessProfileRoutes);
app.use("/business/products", businessProductRoutes);
app.use("/business/orders", businessOrderRoutes);
app.use("/business/reviews", reviewRoutes);
app.use("/customer/auth", customerAuthRoutes);

// ✅ Production-safe Server Startup Flow
const startServer = async () => {
  try {
    console.log("Connecting to Databases...");
    await connectMongoose();
    const db = await connectMongoClient();
    app.locals.db = db;
    console.log("Database connections successful ✅");

    server.timeout = 120000; // 2 minutes
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error("❌ CRITICAL: Server failed to start due to DB connection error:", err);
    // In production, we log the error but don't crash the cluster/process silently if possible, 
    // or let the orchestrator (Render) restart the instance.
  }
};

startServer();
 
