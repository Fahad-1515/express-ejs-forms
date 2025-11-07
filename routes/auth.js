const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup routes
router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    errors: [],
    formData: {},
  });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];

    // Validation
    if (!name || name.trim().length < 2)
      errors.push("Name must be at least 2 characters");
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      errors.push("Please enter a valid email");
    if (!password || password.length < 6)
      errors.push("Password must be at least 6 characters");
    if (password !== confirmPassword) errors.push("Passwords do not match");

    if (errors.length > 0) {
      return res.render("signup", {
        title: "Sign Up",
        errors,
        formData: req.body,
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      errors.push("User with this email already exists");
      return res.render("signup", {
        title: "Sign Up",
        errors,
        formData: req.body,
      });
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    res.render("signup", {
      title: "Sign Up",
      errors: ["An error occurred during signup"],
      formData: req.body,
    });
  }
});

// Login routes
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    errors: [],
    formData: {},
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = [];

    // Validation
    if (!email || !password) {
      errors.push("Please enter both email and password");
    }

    if (errors.length > 0) {
      return res.render("login", {
        title: "Login",
        errors,
        formData: req.body,
      });
    }

    // Find user and validate password
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      errors.push("Invalid email or password");
      return res.render("login", {
        title: "Login",
        errors,
        formData: req.body,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", {
      title: "Login",
      errors: ["An error occurred during login"],
      formData: req.body,
    });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
