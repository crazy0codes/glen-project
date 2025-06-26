import mongoose, { Schema, model } from "mongoose";

const bookingsSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    bookings: { type: mongoose.Types.ObjectId, require: true }
});

export const Bookings = model("Bookings", bookingsSchema);

export default Bookings;
