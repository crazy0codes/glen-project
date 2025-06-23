import UserController from "./userController";
import UserModel from "../models/userModel";
// import PropertyController from "./propertyController";
// import PropertyModel from "../models/propertyModel";
import ListingsController from "./listingController";
import ListingsModel from "../models/listingModel";
import BookingModel from "../models/bookings";
import BookingsController from "./bookingController";


export const userController = new UserController(new UserModel)
// export const propertyController = new PropertyController(new PropertyModel)
export const listingsController = new ListingsController(new ListingsModel);
export const bookingsController = new BookingsController(new BookingModel);

export default {
    userController,
    // propertyController
    listingsController,
    bookingsController
}