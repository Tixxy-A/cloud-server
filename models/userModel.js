import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a user name'],
    minlength: 3,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  resources: [{ type: String, default: [] }],
  subscribedTo: { type: String, default: null },
});

userScheme.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
});

userScheme.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREY,
  });
};

userScheme.methods.checkPassword = async function (candidatePassword) {
  const check = await bcrypt.compare(candidatePassword, this.password);
  return check;
};

export default mongoose.model('User', userScheme);
