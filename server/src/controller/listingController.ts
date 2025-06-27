import { Request, Response } from "express";
import UserModel from "../models/userModel";
import mongoose, { isValidObjectId, Mongoose, SchemaTypes } from "mongoose";
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
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //Get all listed by specific user
  getById = async (req: Request, res: Response) => {
    try {
      let properties;
      const { id } = (req as any).user;
      if (isValidObjectId(id) && id) {
        properties = await this.listingsModel.listedBy(id);
      }

      res.status(200).json(properties);
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

      const property = await this.listingsModel.save({
        url,
        price,
        listedBy,
        location,
      });

      res.status(201).json(property.toObject());
    } catch (error: any) {
      res.status(500).json({
        success: false,
        messsage: error.message,
      });
    }
  };

  //Delete property
  // delete = async (req: Request, res: Response) => {
  //   try {
  //     const { propertyId } = req.body;
  //     const { role, id: userId } = (req as any).user;

  //     // Validate ID
  //     if (!isValidObjectId(propertyId)) {
  //       res
  //         .status(400)
  //         .json({ success: false, message: "Invalid property ID" });
  //     }

  //     // Find property by ID
  //     const property = await this.listingsModel.getById(propertyId);

  //     if (!property) {
  //       res.status(404).json({ success: false, message: "Property not found" });
  //     }

  //     // Admins can delete anything
  //     if (role === "admin") {
  //       await this.listingsModel.delete(propertyId);
  //       res
  //         .status(200)
  //         .json({ success: true, message: "Property deleted by admin" });
  //     }

  //     // Users can only delete their own properties
  //     if (role === "user" && property) {
  //       const isOwner = property.listedBy?.toString() === userId;

  //       if (!isOwner) {
  //         res.status(403).json({
  //           success: false,
  //           message: "You are not authorized to delete this property",
  //         });
  //       }

  //       await this.listingsModel.delete(propertyId);
  //       res
  //         .status(200)
  //         .json({ success: true, message: "Property deleted by user" });
  //     }

  //     res.status(403).json({
  //       success: false,
  //       message: "Unauthorized action",
  //     });
  //   } catch (error: any) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };

  delete = async (req: Request, res: Response) => {
    try {
      const { propertyId } = req.body;
      const { role, id: userId } = (req as any).user;

      if (!isValidObjectId(propertyId)) {
        res
          .status(400)
          .json({ success: false, message: "Invalid property ID" });
      }

      const property = await this.listingsModel.getById(propertyId);

      if (!property) {
        res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }

      if (role === "admin") {
        await this.listingsModel.delete(propertyId);
        res
          .status(200)
          .json({ success: true, message: "Property deleted by admin" });
      }

      if (role === "user" && property) {
        const isOwner = property.listedBy?.toString() === userId;

        if (!isOwner) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to delete this property",
          });
        }

        await this.listingsModel.delete(propertyId);
        res
          .status(200)
          .json({ success: true, message: "Property deleted by user" });
      };
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //Update Property
  // update = async (req: Request, res: Response) => {
  //   try {
  //     const { propertyId, price, location, description} = req.body;
  //     const { role, id: userId } = (req as any).user;

  //     // Validate ID
  //     if (!isValidObjectId(propertyId)) {
  //       res
  //         .status(400)
  //         .json({ success: false, message: "Invalid property ID" });
  //     }

  //     // Find property by ID
  //     const property = await this.listingsModel.getById(propertyId);

  //     if (!property) {
  //       res.status(404).json({ success: false, message: "Property not found" });
  //     }

  //     // Admins can delete anything
  //     if (role === "admin") {
  //       await this.listingsModel.update({propertyId, location, price});
  //       res
  //         .status(200)
  //         .json({ success: true, message: "Property updated by admin" });
  //     }

  //     // Users can only delete their own properties
  //     if (role === "user" && property) {
  //       const isOwner = property.listedBy?.toString() === userId;

  //       if (!isOwner) {
  //         res.status(403).json({
  //           success: false,
  //           message: "You are not authorized to update this property",
  //         });
  //       }

  //       const updatedProperty = await this.listingsModel.update({propertyId, location, price});
  //       res
  //         .status(200)
  //         .json({ success: true, message: "Property updated by user" , property: updatedProperty});
  //     }

  //   } catch (error: any) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };

  // Update Property
  update = async (req: Request, res: Response) => {
    try {
      const { propertyId, price, location, description } = req.body;
      const { role, id: userId } = (req as any).user; // Assuming (req as any).user correctly extracts user and role

      // Validate ID
      if (!isValidObjectId(propertyId)) {
        res
          .status(400)
          .json({ success: false, message: "Invalid property ID" });
      }

      // Find property by ID
      const property = await this.listingsModel.getById(
        new mongoose.Types.ObjectId(propertyId)
      ); // Pass ObjectId

      if (!property) {
        res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }

      // Prepare update data dynamically
      const updateFields: { [key: string]: any } = {};
      if (price !== undefined) updateFields.price = price;
      if (location !== undefined) updateFields.location = location;
      if (description !== undefined) updateFields.description = description;

      if (Object.keys(updateFields).length === 0) {
        res
          .status(400)
          .json({ success: false, message: "No update fields provided" });
      }

      let updatedProperty;

      // Admins can update any property
      if (role === "admin") {
        updatedProperty = await this.listingsModel.update(
          propertyId,
          updateFields
        );
        if (!updatedProperty) {
          res.status(404).json({
            success: false,
            message: "Property not found after update attempt",
          });
        }
        res.status(200).json({
          success: true,
          message: "Property updated by admin",
          property: updatedProperty,
        });
      }

      // Users can only update their own properties
      if (role === "user" && property) {
        const isOwner = property.listedBy?.toString() === userId;

        if (!isOwner) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to update this property",
          });
        }

        updatedProperty = await this.listingsModel.update(
          propertyId,
          updateFields
        );
        if (!updatedProperty) {
          res.status(404).json({
            success: false,
            message: "Property not found after update attempt",
          });
        }
        res.status(200).json({
          success: true,
          message: "Property updated by user",
          property: updatedProperty,
        });
      }

    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //get Details
  getDetails = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const details = await this.listingsModel.getById(
        new mongoose.Types.ObjectId(id)
      );

      if (!details) {
        throw new Error("Property details not found");
      }
      if (!details.listedBy) {
        throw new Error("Owner (listedBy) not found");
      }
      const owner = await User.findById(details.listedBy);

      res.status(200).json({
        ...details.toObject(),
        owner: owner ? owner.toObject() : null,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default ListingsController;
