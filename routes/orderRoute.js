import express from "express";
import { adminProtect, userProtect } from "../middlewares/authCheckHandler.js";
import {
  orderProduct,
  getOrderDetails,
  getAllOrderDetailsForAdmin,
  updateOrderDetails,
  deleteOrder,
  getTotalSales,
} from "../controllers/orderController.js";

//init router
const router = express.Router();

// @route        POST /api/v1/orders
// @desc         Ordering products
// @access       User
router.route("/").post(userProtect, orderProduct);

// @route        GET /api/v1/orders
// @desc         Fetching user order details
// @access       User
router.route("/").get(userProtect, getOrderDetails);

// @route        GET /api/v1/orders/allorders
// @desc         Fetching all orders details as admin
// @access       Admin
router.route("/allorders").get(adminProtect, getAllOrderDetailsForAdmin);

// @route        PUt /api/v1/orders/:id
// @desc         Updating the order status.
// @access       Admin
router.route("/:id").put(adminProtect, updateOrderDetails);

// @route        DELETE /api/v1/orders/:id
// @desc         User can now delete their order by ID.
// @access       User
router.route("/:id").delete(userProtect, deleteOrder);

// @route        GET /api/v1/orders/getsales
// @desc         Fetching total sales
// @access       Admin
router.route("/getsales").get(adminProtect, getTotalSales);

export default router;
