import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongoDB.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import contactRouter from "./routes/contactRoutes.js";

const app = express();

// cloud connections
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.json("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.use("/api/contact", express.json(), contactRouter);

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
