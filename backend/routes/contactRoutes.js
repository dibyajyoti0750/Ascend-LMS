import express, { Router } from "express";
import nodemailer from "nodemailer";
import wrapAsync from "../middlewares/wrapAsync.js";

const contactRouter = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

contactRouter.post(
  "/send-email",
  wrapAsync(async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      replyTo: email,
      to: process.env.SENDER_EMAIL,
      subject: "[Ascend] New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  }),
);

export default contactRouter;
