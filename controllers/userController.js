import { validateUserSchema } from "../utils/validateSchema.js";
import User from "../models/userModel.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @route        POST /api/v1/users/register
// @desc         Registering a new user.
const registerUser = async (req, res, next) => {
  try {
    const { error } = validateUserSchema.validateAsync(req.body);
    if (error) throw createError.BadRequest(error);

    const {
      name,
      email,
      password,
      street,
      apartment,
      city,
      zip,
      country,
      phone,
      isAdmin,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      throw createError.BadRequest("Email already registered. Please login.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name,
        email,
        password: hashedPassword,
        street,
        apartment,
        city,
        zip,
        country,
        phone,
        isAdmin,
      });
      await user.save();
      res.status(200).send({
        success: `${email} registered successfully.`,
        message: "Please Login.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// @route        POST /api/v1/users/login
// @desc         Login registered user.
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw createError.BadRequest(`${email} not registered. Please register.`);
    } else {
      const hashed = await bcrypt.compare(password, user.password);
      if (!hashed) {
        throw createError.BadRequest("Invalid password.");
      } else {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).send({
          message: `Successfully logged in. Welcome ${user.name}!.`,
          AccessToken: token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
