import express from "express";
import {
  registerUser,
  loginUser,
  getCustomerCount,
} from "../controllers/userController.js";
import { adminProtect } from "../middlewares/authCheckHandler.js";

//init router
const router = express.Router();

// @route        POST /api/v1/users/register
// @desc         Registering a new user.
// @access       Public
router.route("/register").post(registerUser);

// @route        POST /api/v1/users/login
// @desc         Login registered user.
// @access       public
router.route("/login").post(loginUser);

// @route        GET /api/v1/users/get/count
// @desc         Fetching all customers.
// @access       admin
router.route("/get/count").get(adminProtect, getCustomerCount);

export default router;
