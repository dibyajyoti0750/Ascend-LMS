import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongoDB.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import wrapAsync from "./middlewares/wrapAsync.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

// cloud connections
await connectDB();
await connectCloudinary();

app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.json("API Working"));
app.use("/api/educator", educatorRouter);

const PORT = process.env.PORT || 8080;

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ success: false, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
