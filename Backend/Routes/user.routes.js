const express = require("express");
const userRoutes = express.Router();
const User = require("../Models/user.model");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// userRoutes.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the user
 *        email:
 *          type: string
 *          description: Email of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error message
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

userRoutes.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const isEmailValid = Validator.isEmail(email);
    const isStrongPassword = Validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isStrongPassword) {
      throw new Error("Password not strong enough");
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error(err);
      }
      const user = new User({ name, email, password: hash });
      await user
        .save()
        .then(() => {
          res.status(200).json({ message: "User created successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 authToken:
 *                   type: string
 *                   description: Authentication token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // console.log(user.password, password);
    bcrypt.compare(password, user.password, (err, result) => {
      // console.log({ result });
      if (result) {
        const authToken = jwt.sign(
          { userID: user._id },
          process.env.AUTH_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { userID: user._id },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "7d",
          }
        );
        res.cookie("authToken", authToken, {
          // httpOnly: true,
          maxAge: 1000 * 60 * 60,
          sameSite: "none",
          secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
          // httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
          secure: true,
        });
        res
          .status(200)
          .json({ message: "Login successful", user, authToken, refreshToken });
      } else {
        res.status(201).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

userRoutes.get("/logout", async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRoutes;
