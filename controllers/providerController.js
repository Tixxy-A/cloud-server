import Provider from "../models/providerModel.js";
import { StatusCodes } from "http-status-codes";

export const updateProvider = async (req,res,next) => {
    const {newProvider} = req.body;
    const {id: providerId} = req.params;
    console.log(newProvider);


    await Provider.findByIdAndUpdate(providerId, newProvider);
    const provider = await Provider.findById(providerId);

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: {
            provider
        }
    })

}
