import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const providerSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a user name"] },
  cost: { type: Number, required: true },
  sales: { type: Number, default: 0 },
  response_time: { type: Number, required: true },
  network_bandwidth: { type: Number, required: true },
  available_VM: { type: Number },
  total_VM: { type: Number, required: true },
  max_vm_configure : { type: String},
  security_management: { type: String },
  flexibility: { type: String },
  cpu_capacity: { type: String },
  boot_time: { type: String },
  memory_size: { type: String },
  boot_time: { type: String },
  scale_up: { type: String },
  scale_down: { type: String },
  scale_up_time: { type: String },
  scale_down_time: { type: String },
  auto_scaling: { type: String },
  storage: { type: String },
  min_storage: {type: String},
  min_bandwidth: {type: String},
  max_bandwidth: {type: String},
  max_storage: {type: String},
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

providerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
});

providerSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREY,
  });
};

providerSchema.methods.checkPassword = async function (candidatePassword) {
  const check = await bcrypt.compare(candidatePassword, this.password);
  return check;
};

export default mongoose.model("Provider", providerSchema);
