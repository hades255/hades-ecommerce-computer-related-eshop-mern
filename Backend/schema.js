const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  username: { type: String, minlength: 3 },
  email: { type: String },
  password: { type: String },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  originalPrice: { type: Number },
  reducedPrice: { type: Number },
  img: { type: String },
  rating: { type: Number },
  comments: { type: Array },
});

const gpuSC = mongoose.model("gpuSC", productSchema, "GPU");
const processorSC = mongoose.model("processorSC", productSchema, "Processor");
const cabinetSC = mongoose.model("cabinetSC", productSchema, "Cabinet");
const storageSC = mongoose.model("storageSC", productSchema, "Storage");
const ramSC = mongoose.model("ramSC", productSchema, "RAM");
const mouseSC = mongoose.model("mouseSC", productSchema, "Mouse");
const keyboardSC = mongoose.model("keyboardSC", productSchema, "KeyBoard");
const monitorSC = mongoose.model("monitorSC", productSchema, "Monitor");

module.exports = {
  gpuSC,
  processorSC,
  cabinetSC,
  storageSC,
  ramSC,
  mouseSC,
  keyboardSC,
  monitorSC,
};
