import express from "express";
import { protect } from "../middlewares/auth.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import { getPurchaseReceipt } from "../controllers/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.get("/:receiptId", protect, wrapAsync(getPurchaseReceipt));

export default purchaseRouter;
