import { Types } from "mongoose";
import Property from "../db/schemas/propertySchema";

interface Props {
  listedBy: Types.ObjectId;
  url: string;
  location: string;
  price: number;
}

export class PropertyModel {
  async getById(id: string) {
    try {
      const _id = new Types.ObjectId(id);
      return await Property.findById(_id);
    } catch (error: any) {
      console.error("Error while saving data ", error.message);
      throw error;
    }
  }

  //Save Property
  async save(propertyData: Props) {
    try {
      const newProperty = new Property(propertyData);
      return newProperty.save();
    } catch (error: any) {
      console.error("Error while saving data ", error.message);
      throw error;
    }
  }

  //Get all properties
  async getAll() {
    try {
      return await Property.find();
    } catch (error: any) {
      console.error("Error while fetching Properties ", error.message);
      throw error;
    }
  }

  //Listed by user
  async listedBy(listedBy: string) {
    try {
      return await Property.find({ listedBy });
    } catch (error: any) {
      console.error("Error while fetching Propertie ", error.message);
      throw error;
    }
  }

  //Booked by user
  async bookedBy(bookedBy: string) {
    try {
      return await Property.find({ bookedBy });
    } catch (error: any) {
      console.error("Error while fetching Propertie ", error.message);
      throw error;
    }
  }
}

export default PropertyModel;
