import { ObjectId, Types } from "mongoose";
import Property from "../db/schemas/propertySchema";
import Listings from "../db/schemas/listingSchema";

interface Props {
  listedBy: Types.ObjectId,
  url: string;
  location: string;
  price: number;
}

export class ListingsModel {

  //Save Property
  async save(propertyData: Props){
    try {
      const newProperty = new Listings(propertyData);
      return newProperty.save();
    } catch (error: any) {
      console.error("Error while saving data ", error.message);
      throw error
    }
  };

  //Get all properties
  async getAll(){
    try {
        return await Listings.find();
    }
    catch(error:any){
        console.error("Error while fetching Properties ", error.message);
        throw error;
    }
  }

  //Listed by user
  async listedBy(listedBy:string){
    try {
        return await Listings.find({listedBy});
    }
    catch(error:any){
        console.error("Error while fetching Propertie ",error.message)
        throw error;
    }
  }

  //Delete the listing
  async delete(_id:ObjectId){
    try {
        return await Listings.deleteOne({_id});
    }
    catch(error: any){
        console.log("Error while deleting the lisiting ", _id , error.message);
        throw error;
    }
  }

}


export default ListingsModel;