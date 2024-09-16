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
  name: String,
  id: String,
  model: String,
  price: Number,
  location: String,
  availability: { type: Date },
  carType: String,
  fuelType: String,
  transmissionType: String,
  dealerType: String,
  year: Number,
  image: { type: String, default: null },
});
const carModel= new mongoose.model('Car', CarSchema);
export {userModel, carModel};
  