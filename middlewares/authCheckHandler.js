import jwt, { decode } from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/userModel.js";

const adminProtect = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user.isAdmin) {
        throw createError.BadRequest("Admin access required.");
      } else {
        next();
      }
    } else {
      throw createError.BadRequest("Admin authorization token required.");
    }
  } catch (error) {
    next(error);
  }
};

const userProtect = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user.isAdmin === false) {
        next();
      } else {
        throw createError.BadRequest("Please login. Invalid user token.");
      }
    } else {
      throw createError.BadRequest("User authorization token required.");
    }
  } catch (error) {
    next(error);
  }
};

export { adminProtect, userProtect };
