import express from "express";
import { registerUser } from "../controllers/userController.js";

//init router
const router = express.Router();

// @route        POST /api/v1/users/register
// @desc         Registering a new user.
// @access       Public
router.route("/register").post(registerUser);

export default router;
