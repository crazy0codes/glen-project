import mongoose, { ObjectId, Types, isValidObjectId } from "mongoose";
import Listings from "../db/schemas/listingSchema";

export interface Props {
  propertyId?: mongoose.Types.ObjectId;
  listedBy: mongoose.Types.ObjectId;
  url: string;
  location: string;
  price: number;
  name?: string;
  description?: string;
}

export class ListingsModel {
  async save(propertyData: Props) {
    try {
      const newProperty = new Listings(propertyData);
      return await newProperty.save();
    } catch (error: any) {
      console.error("Error while saving listing:", error.message);
      throw error;
    }
  }

  async getAll() {
    try {
      return await Listings.find();
    } catch (error: any) {
      console.error("Error while fetching properties:", error.message);
      throw error;
    }
  }

  async listedBy(listedBy: Types.ObjectId) {
    try {
      return await Listings.find({ listedBy });
    } catch (error: any) {
      console.error("Error while fetching user's listings:", error.message);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const objectId = isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null;
      if (!objectId) throw new Error("Invalid ObjectId format");
      return await Listings.findByIdAndDelete(objectId);
    } catch (error: any) {
      console.error("Error while deleting listing:", error.message);
      throw error;
    }
  }

  async getById(id: mongoose.Types.ObjectId | string) {
    try {
      const objectId = typeof id === 'string' ? (isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null) : id;
      if (!objectId) throw new Error("Invalid ObjectId format");
      return await Listings.findById(objectId);
    } catch (error: any) {
      console.error("Error while fetching listing by ID:", error.message);
      throw error;
    }
  }

  async update(propertyId: string, updateData: Partial<Props>) {
    try {
      const objectId = isValidObjectId(propertyId) ? new mongoose.Types.ObjectId(propertyId) : null;
      if (!objectId) throw new Error("Invalid ObjectId format");

      const updatedListing = await Listings.findByIdAndUpdate(
        objectId,
        updateData,
        { new: true }
      );
      return updatedListing;
    } catch (error: any) {
      console.error("Error while updating listing:", error.message);
      throw error;
    }
  }
}

export default ListingsModel;