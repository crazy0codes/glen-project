import { Schema, model } from "mongoose";

const bookingsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookings: [{ type: Schema.Types.ObjectId, require: true }]
});

export const Bookings = model("Bookings", bookingsSchema);

export default Bookings;
