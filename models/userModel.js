import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 18,
    required: true,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zip: {
    type: Number,
    default: 000000,
  },
  country: {
    type: String,
    default: "India",
  },
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
