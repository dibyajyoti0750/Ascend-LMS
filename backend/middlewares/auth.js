import { clerkClient } from "@clerk/express";
import ExpressError from "../utils/expressError.js";
import wrapAsync from "./wrapAsync.js";

// Allow valid users
export const protect = wrapAsync(async (req, res, next) => {
  const { userId } = await req.auth();
  if (!userId) throw new ExpressError(401, "Not authenticated");
  next();
});

// Protect educator routes
export const protectEducator = wrapAsync(async (req, res, next) => {
  const { userId } = await req.auth();
  const response = await clerkClient.users.getUser(userId);

  if (response.publicMetadata.role !== "educator") {
    return res.json({ success: false, message: "Unauthorized access" });
  }

  next();
});
