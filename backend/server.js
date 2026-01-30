import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongoDB.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import wrapAsync from "./middlewares/wrapAsync.js";

const app = express();
// connect to DB
await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("API working"));
app.post("/clerk", wrapAsync(clerkWebhooks));

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
