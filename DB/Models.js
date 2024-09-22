import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    mobile:{
      type: "string",
      required: true,
    },
    isVerfied:{
      type: "boolean",
      required: false,
    },gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Example values
    },
    dob: {
      type: Date,
    },
    location: {
      type: String,
    },
  });
const userModel = new mongoose.model("user", userSchema, "users");
const CarSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: Date,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  transmissionType: {
    type: String,
    required: true,
  },
  dealerType: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  seats: {
    type: String,
    required: true, // Assuming seats are mandatory
  },
  email: String,
  image: {
    type: String,
    default: null,
  },
});

const carModel= new mongoose.model('Car', CarSchema);
export {userModel, carModel};
  