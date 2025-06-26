import mongoose, { ObjectId, Types } from "mongoose";
import Bookings from "../db/schemas/bookingsSchemas";

interface Props {
  userId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
}

export class BookingModel {
  //Save Property
  async save({ userId, propertyId }: Props) {
    try {
      const booking = await Bookings.create({
        userId,
        propertyId
      });
      return booking;
    } catch (error: any) {
      console.error("Error while saving data ", error.message);
      throw error;
    }
  }

  //Get all properties
  async getAll(userId: ObjectId) {
    try {
      return await Bookings.find({ userId });
    } catch (error: any) {
      console.error("Error while fetching Properties ", error.message);
      throw error;
    }
  }
}

export default BookingModel;
