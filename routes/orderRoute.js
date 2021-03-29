import express from "express";
import { userProtect } from "../middlewares/authCheckHandler.js";
import {
  orderProduct,
  getOrderDetails,
} from "../controllers/orderController.js";

//init router
const router = express.Router();

// @route        POST /api/v1/orders
// @desc         Ordering products
// @access       Private
router.route("/").post(userProtect, orderProduct);

// @route        GET /api/v1/orders
// @desc         Ordering products
// @access       Private
router.route("/").get(userProtect, getOrderDetails);

export default router;
