const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json("Signup successful");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("User not found");

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click below to reset password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.send("Reset email sent");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).send("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.send("Password reset successful");
});

module.exports = router;
