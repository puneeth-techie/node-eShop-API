import Order from "../models/orderModel.js";
import OrderItems from "../models/orderItemsModel.js";
import User from "../models/userModel.js";
import createError from "http-errors";

// @route        POST /api/v1/orders
// @desc         Ordering products
const orderProduct = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
      user,
      dateOrdered,
    } = req.body;

    //Getting OrderID's when we post the orders
    const orderIds = orderItems.map((orderItem) => {
      let newOrderItem = new OrderItems({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem
        .save()
        .then((newItem) => {
          return newItem._id;
        })
        .catch((err) => {
          throw createError.BadRequest(err);
        });
    });

    //Taking logging user information to update the order details
    let user = req.user;
    user = await User.findById(user.id).select("-password");
    if (!user) {
      throw createError.BadRequest(
        "Invalid User token. Please loging with a valid token"
      );
    } else {
      const totalPrices = orderIds.map((id) => {
        OrderItems.findById(id)
          .populate("product", "price")
          .then((product) => {
            return id.product.price * id.quantity;
          })
          .catch((err) => {
            throw createError.BadRequest(err);
          });
      });
      const sumPrice = totalPrices.reduce((a, b) => a + b, 0);

      const order = new Order({
        orderItems: orderIds,
        shippingAddress1: `${user.name}, ${user.apartment}, ${user.street}`,
        shippingAddress2,
        city: user.city,
        zip: user.zip,
        country: user.country,
        phone: user.phone,
        status,
        totalPrice: sumPrice,
        user: user._id,
        dateOrdered,
      });
      await order.save();
      res.status(200).send(order);
    }
  } catch (error) {
    next(error);
  }
};

export { orderProduct };
