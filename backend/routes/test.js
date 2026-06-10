import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const test_routes = express.Router();
export const auth_routes = express.Router();

test_routes.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected",
  });
});


// REGISTER
auth_routes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
