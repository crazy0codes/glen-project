import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { isValidObjectId, SchemaTypes } from "mongoose";
import ListingsModel from "../models/listingModel";
import User from "../db/schemas/userSchema";

export class ListingsController {
  listingsModel;
  constructor(listingsModel: ListingsModel) {
    this.listingsModel = listingsModel;
  }

  //Get all
  getAll = async (req: Request, res: Response) => {
    try {
      const properties = await this.listingsModel.getAll();
      res.status(200).json(properties);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //Get all listed by specific user
  getById = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = new UserModel();
      const userId = (await user.findByEmail(email))?._id;
      let properties;

      if (isValidObjectId(userId) && userId) {
        properties = await this.listingsModel.listedBy(userId);
      }

      res.status(200).json({
        ...properties,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  //Save property
  save = async (req: Request, res: Response) => {
    try {
      const { email, url, location, price } = req.body;
      const user = new UserModel();
      const listedBy = (await user.findByEmail(email))?._id; //Check for the user

      if (!listedBy) throw new Error("No user found");

      const property = await this.propertyModel.save({
        url,
        price,
        listedBy,
        location,
      });

      res.status(201).json(property.toObject());
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        success: false,
        messsage: error.message,
      });
    }
  };

  //Delete property
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid property ID" });
      }
      const deleted = await this.listingsModel.delete(
        new SchemaTypes.ObjectId(id)
      );
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Property deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //get Details
  getDetails = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const details = await this.listingsModel.find(new SchemaTypes.ObjectId(id));
      
      if (!details) {
        throw new Error("Property details not found");
      }
      if (!details.listedBy) {
        throw new Error("Owner (listedBy) not found");
      }
      const owner = await User.findById(details.listedBy);

      res.status(200)
         .json({
          ...details.toObject(),
          owner: owner ? owner.toObject() : null
         })
    } 
    catch (error: any) {

    }
  };
}

export default ListingsController;
