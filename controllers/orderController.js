import Order from "../models/orderModel.js";
import OrderItems from "../models/orderItemsModel.js";
import User from "../models/userModel.js";
import createError from "http-errors";

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

      res.status(200).send(order);
    }
  } catch (error) {
    next(error);
  }
};

export { orderProduct, getOrderDetails };
