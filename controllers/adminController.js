import NotFoundError from "../errors/NotFound.js";
import Provider from "../models/providerModel.js";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllProviders = async (req, res, next) => {
  const providers = await Provider.find();

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      providers,
    },
  });
};

export const getDetails = async (req, res, next) => {
  const users = await User.find();
  users.forEach((user) => {
    console.log(user.name);
  });
  let globalId = -1;

  const resolvePromisesSeq = async (tasks) => {
    const results = [];
    for (const task of tasks) {
      results.push(await task);
    }
    return results;
  };

  const details = users.map(async (usr) => {
    let prv = null;
    if (usr.subscribedTo !== "null")
      prv = await Provider.findById(usr.subscribedTo);
    // console.log(prv);

    let name = "null";
    if (prv) name = prv.name;

    let providerId = "null";
    if (prv) providerId = prv._id;

    return {
      userName: usr.name,
      userId: usr._id,
      providerName: name,
      providerId,
    };
  });

  let final_details = await resolvePromisesSeq(details);

  final_details = final_details.map((obj) => {
    return {
      ...obj,
      id: ++globalId,
    };
  });

  console.log(final_details);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      details: final_details,
    },
  });
};
