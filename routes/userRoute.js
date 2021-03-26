import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

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

export default router;
