import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);

export default OrderItems;
