import User from '../models/userModel.js';
import Provider from '../models/providerModel.js';
import Admin from '../models/adminModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, AuthenticationError } from '../errors/index.js';
import attachCookie from '../utils/attachCookies.js';

const signup = async (req, res, next) => {
  // console.log(req);
  const { name, email, password, confirmPass } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !confirmPass)
    throw new BadRequestError('Please provide all the necessary details');

  const userAlreadyExists = await User.findOne({ email: email });

  // console.log(userAlreadyExists);
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm: confirmPass,
  });
  const token = newUser.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        resources: newUser.resources,
        subscribedTo: newUser.subscribedTo,
      },
      token,
      message: 'User registered',
    },
  });
};
const signupAdmin = async (req, res, next) => {
  // console.log(req);
  const { name, email, password, confirmPass } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !confirmPass)
    throw new BadRequestError('Please provide all the necessary details');

  const adminAlreadyExists = await Admin.findOne({ email: email });

  // console.log(userAlreadyExists);
  if (adminAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const newAdmin = await Admin.create({
    name,
    email,
    password,
    passwordConfirm: confirmPass,
  });
  const token = newAdmin.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    data: {
      admin: {
        name: newAdmin.name,
        email: newAdmin.email,
        token,
      },
      message: 'Admin registered',
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Please provide all values');
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new AuthenticationError('No such User exists!');
  const isPasswordCorrect = user.checkPassword(password);

  if (!isPasswordCorrect) throw new AuthenticationError('Incorrect Password!');

  const token = user.createJWT();

  attachCookie({ res, token });
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password)
    throw new BadRequestError('Please provide all values');
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) throw new AuthenticationError('No such User exists!');
  const isPasswordCorrect = admin.checkPassword(password);

  if (!isPasswordCorrect) throw new AuthenticationError('Incorrect Password!');

  const token = admin.createJWT();

  attachCookie({ res, token });
  admin.password = undefined;
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      admin,
      token,
    },
  });
};

const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;

  await user.save();
  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(200).json({
    status: 'success',
    data: {
      userName: user.name,
    },
  });
};

const getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

const signupProvider = async (req, res, next) => {
  // console.log(req);
  const {
    email,
    password,
    brandName,
    cost,
    available_VM,
    network_bandwidth,
    security_management,
    flexibility,
    response_time,
    cpu_capacity,
    memory_size,
    boot_time,
    scale_up_time,
    scale_down_time,
    scale_up,
    scale_down,
    auto_scaling,
    storage,
    confirmPass,
    min_bandwidth,
    max_bandwidth,
    min_storage,
    max_storage,
  } = req.body;
  console.log(req.body);

  const providerAlreadyExists = await Provider.findOne({ email: email });

  // console.log(userAlreadyExists);
  if (providerAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const newProvider = await Provider.create({
    email,
    total_VM: available_VM,
    password,
    passwordConfirm: confirmPass,
    name: brandName,
    cost,
    available_VM,
    network_bandwidth,
    security_management,
    flexibility,
    response_time,
    cpu_capacity,
    memory_size,
    boot_time,
    scale_up_time,
    scale_down_time,
    scale_up,
    scale_down,
    auto_scaling,
    storage,
    min_bandwidth,
    max_bandwidth,
    min_storage,
    max_storage,
  });
  const token = newProvider.createJWT();
  newProvider.password = undefined;

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    data: {
      provider: newProvider,
      message: 'CSP registered',
      token,
    },
  });
};

const loginProvider = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Please provide all values');
  const provider = await Provider.findOne({ email }).select('+password');

  if (!provider) throw new AuthenticationError('No such User exists!');
  const isPasswordCorrect = provider.checkPassword(password);

  if (!isPasswordCorrect) throw new AuthenticationError('Incorrect Password!');

  const token = provider.createJWT();

  attachCookie({ res, token });
  provider.password = undefined;
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      provider,
      token,
    },
  });
};

const getCurrentProvider = async (req, res, next) => {
  const provider = await Provider.findOne({ _id: req.provider.id });
  res.status(200).json({
    status: 'success',
    data: {
      provider,
    },
  });
};

export {
  login,
  signup,
  updateUser,
  getCurrentUser,
  signupProvider,
  loginProvider,
  getCurrentProvider,
  loginAdmin,
  signupAdmin,
};
