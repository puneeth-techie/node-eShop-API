import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: now }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
