import Order from "../models/orderModel.js";
import OrderItems from "../models/orderItemsModel.js";
import User from "../models/userModel.js";
import createError from "http-errors";
import mongoose from "mongoose";

// @route        POST /api/v1/orders
// @desc         Ordering products
const orderProduct = async (req, res, next) => {
  try {
    //Getting OrderID's when we post the orders
    const orderIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItems({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        await newOrderItem.save();
        return newOrderItem._id;
      })
    );
    const orderIdsArray = await orderIds;

    //Taking logging user information to update the order details
    const userInfo = await User.findById(req.user._id).select("-password");
    if (!userInfo) {
      throw createError.BadRequest(
        "Invalid User token. Please loging with a valid token"
      );
    } else {
      const totalPrices = await Promise.all(
        orderIdsArray.map(async (id) => {
          const item = await OrderItems.findById(id).populate(
            "product",
            "price"
          );
          return item.product.price * item.quantity;
        })
      );

      const sumPrice = totalPrices.reduce((a, b) => a + b, 0);

      const order = new Order({
        orderItems: orderIdsArray,
        shippingAddress1: `${userInfo.name}, ${userInfo.apartment}, ${userInfo.street}`,
        shippingAddress2: req.body.shippingAddress2,
        city: userInfo.city,
        zip: userInfo.zip,
        country: userInfo.country,
        phone: userInfo.phone,
        status: req.body.status,
        totalPrice: sumPrice,
        user: userInfo._id,
        dateOrdered: req.body.dateOrdered,
      });
      await order.save();
      res.status(200).send(order);
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/orders
// @desc         Ordering products
const getOrderDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.BadRequest(
        "Invalid user access token. Please login get access token"
      );
    } else {
      const order = await Order.find({ user: req.user._id }).populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
      if (!order) {
        throw createError.BadRequest("No orders found in your cart.");
      } else {
        res.status(200).send(order);
      }
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/orders/allorders
// @desc         Fetching all orders details as admin
const getAllOrderDetailsForAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.BadRequest(
        "Invalid admin access token. Admin access needed."
      );
    } else {
      const order = await Order.find()
        .populate({
          path: "orderItems",
          populate: { path: "product", populate: "category" },
        })
        .sort({ dateOrdered: -1 });

      res.status(200).send(order);
    }
  } catch (error) {
    next(error);
  }
};

// @route        PUT /api/v1/orders/allorders
// @desc         Fetching all orders details as admin
const updateOrderDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.BadRequest(
        "Invalid admin access token. Admin access needed."
      );
    } else {
      if (!mongoose.isValidObjectId(req.params.id)) {
        throw createError.BadRequest("Invalid Order ID.");
      } else {
        let order = await Order.findById(req.params.id);
        if (!order) {
          throw createError.BadRequest("Order ID not found. Invalid Order ID.");
        } else {
          if (order.status === "shipped") {
            throw createError.BadRequest("Order has already been shipped.");
          } else {
            order = await Order.findByIdAndUpdate(
              req.params.id,
              {
                status: req.body.status,
              },
              { new: true }
            );
            if (!order) {
              throw createError.BadRequest("Invalid Order ID.");
            } else {
              res.status(200).send(order);
            }
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// @route        DELETE /api/v1/orders/:id
// @desc         User can now delete their order by ID.
const deleteOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.BadRequest("Invalid User access token. Please login.");
    } else {
      if (!mongoose.isValidObjectId(req.params.id)) {
        throw createError.BadRequest("Invalid Order ID.");
      } else {
        const orderInfo = await Order.findById(req.params.id);
        if (!orderInfo) {
          throw createError.BadRequest(
            "You do not have any Order matching with the given Order ID."
          );
        } else {
          if (orderInfo.user === req.user._id) {
            await Order.findByIdAndRemove(req.params.id)
              .then(async (order) => {
                if (order) {
                  order.orderItems.map(async (orderItem) => {
                    await OrderItems.findByIdAndRemove(orderItem);
                  });
                  res.status(200).send({
                    success: true,
                    message: "Your order has been deleted successfully.",
                  });
                } else {
                  throw createError.BadRequest(
                    "Order with the given ID not found."
                  );
                }
              })
              .catch((err) => {
                throw createError.InternalServerError(err);
              });
          } else {
            throw createError.BadRequest(
              "You do not have access to delete this order."
            );
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/orders/getSales
// @desc         Fetching total sales.
const getTotalSales = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.BadRequest(
        "Invalid access token. Admin access required."
      );
    } else {
      const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "totalPrice" } } },
      ]);
      if (!totalSales) {
        throw createError.BadRequest("Order sales cannot be generated.");
      } else {
        res.status(200).send({
          totalSales: totalSales.pop().totalsales,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export {
  orderProduct,
  getOrderDetails,
  getAllOrderDetailsForAdmin,
  updateOrderDetails,
  deleteOrder,
  getTotalSales,
};
