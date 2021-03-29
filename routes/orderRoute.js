import express from "express";
import { userProtect } from "../middlewares/authCheckHandler.js";
import { orderProduct } from "../controllers/orderController.js";

//init router
const router = express.Router();

// @route        POST /api/v1/orders
// @desc         Ordering products
// @access       User login required
router.route("/").post(userProtect, orderProduct);

export default router;
