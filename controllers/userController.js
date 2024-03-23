import User from "../models/userModel.js";
import NotFoundError from "../errors/NotFound.js";
import Provider from "../models/providerModel.js";
import { StatusCodes } from "http-status-codes";

export const subscribe = async (req, res, next) => {
  // console.log(req.params);
  const { id: userId } = req.params;

  const { providerId } = req.body;
  console.log(providerId);

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError("No such user exists");
  }

  const provider = await Provider.findById(providerId);
  


  if (!provider) {
    throw new NotFoundError("No such provider exists");
  }
  console.log(provider);

  const {
    name,
    cost,
    available_VM,
    network_bandwidth,
    flexibility,
    response_time,
    security_management
  } = provider;
  
  const resources = {name,cost,available_VM,network_bandwidth,flexibility,response_time,security_management};
  console.log(resources);

  let sales = provider.sales + provider.cost;
  // console.log(sales);
  await Provider.findByIdAndUpdate(providerId, {
    sales: provider.sales + provider.cost,
  });
 await User.findOneAndUpdate(
    { _id: userId },
    {
      subscribedTo: providerId,
      resources: JSON.stringify(resources)
    }
  );
 const newUser = await User.findById(userId);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      resources,
      user: newUser
    }
  });
};

export const updateResources = async (req,res,next) => {
  const { id: userId } = req.params;

  const { providerId, resources } = req.body;
  // console.log(providerId);

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError("No such user exists");
  }
 
  const provider = await Provider.findById(providerId);
  if (!provider) {
    throw new NotFoundError("No such provider exists");
  }
  const {network_bandwidth: bandwidthOld, storage: storageOld} = user.resources;
  const {network_bandwidth: bandwidthNew, storage: storageNew} = resources;
  const {costperband} = provider;
  if(bandwidthNew !== bandwidthOld){
    const costFactor = (bandwidthNew - bandwidthOld)*costperband;
    await provider.updateOne({
      cost: this.cost + costFactor
    })
  }
  await User.findOneAndUpdate(
    { _id: userId },
    {
      resources: JSON.stringify(resources)
    }
  );
  const userNew = await User.findById(userId);
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      user: userNew
    }
  })

}
