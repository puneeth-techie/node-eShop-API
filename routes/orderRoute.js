import express from "express";
import { adminProtect, userProtect } from "../middlewares/authCheckHandler.js";
import {
  orderProduct,
  getOrderDetails,
  getAllOrderDetailsForAdmin,
} from "../controllers/orderController.js";

//init router
const router = express.Router();

// @route        POST /api/v1/orders
// @desc         Ordering products
// @access       Private
router.route("/").post(userProtect, orderProduct);

// @route        GET /api/v1/orders
// @desc         Fetching user order details
// @access       Private
router.route("/").get(userProtect, getOrderDetails);

// @route        GET /api/v1/orders/allorders
// @desc         Fetching all orders details as admin
// @access       Private
router.route("/allorders").get(adminProtect, getAllOrderDetailsForAdmin);

export default router;
