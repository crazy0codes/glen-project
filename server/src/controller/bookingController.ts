import { Request, Response } from "express";
import UserModel from "../models/userModel";
import Bookings from "../db/schemas/bookingsSchemas";
import BookingModel from "../models/bookings";

export class BookingsController {
  bookingsModel;
  constructor(bookingsModel: BookingModel) {
    this.bookingsModel = bookingsModel;
  }

  //Get all booked by specific user
  getById = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = new UserModel();
      const userId = (await user.findByEmail(email))?._id;
      let properties;

      if (userId) {
        properties = await Bookings.find({ userId });
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

  //Reservation
  save = async (req: Request, res: Response) => {
    try {
      const { email, propertyId } = req.body;

      if (!email || !propertyId) throw new Error("All fields are required");

      const userId = (await new UserModel().findByEmail(email))?._id;
      if (!userId) throw new Error("Invalid Credentials");

      const result = await this.bookingsModel.save({userId,propertyId});

      if (result.modifiedCount === 0 && !result.upsertedCount) {
        throw new Error("Property reservation failed");
      }

      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default BookingsController;
