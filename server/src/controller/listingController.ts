import { Request, Response } from "express";
import PropertyModel from "../models/propertyModel";
import UserModel from "../models/userModel";
import Property from "../db/schemas/propertySchema";
import { isValidObjectId } from "mongoose";

export class PropertyController {
  propertyModel;
  constructor(propertyModel: PropertyModel) {
    this.propertyModel = propertyModel;
  }

  //List all properties
  getAll = async (req: Request, res: Response) => {
    try {
      const properties = await this.propertyModel.getAll();
      res.status(200).json(properties);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //Get all listed by specific user
  listedBy = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = new UserModel();
      const listedBy = (await user.findByEmail(email))?._id;
      let properties;

      if (isValidObjectId(listedBy)) {
        properties = await Property.find({ listedBy });
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

  //Get all booked by specifi user
  bookedBy = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = new UserModel();
      const bookedBy = (await user.findByEmail(email))?._id;
      let properties;

      if (bookedBy) {
        properties = await Property.find({ bookedBy });
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

  buy = async (req: Request, res: Response) => {
    try {
      const { email, propertyId } = req.body;

      if (!email || !propertyId) throw new Error("All fields are required");

      const user = await new UserModel().findByEmail(email);
      if (!user?._id) throw new Error("Invalid Credentials");

      const property = await Property.findByIdAndUpdate(
        propertyId,
        { bookedBy: user._id },
        { new: true }
      );

      if (!property) throw new Error("Property not found or update failed");

      res.status(200).json({
        success: true,
        message: property.toObject(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default PropertyController;
