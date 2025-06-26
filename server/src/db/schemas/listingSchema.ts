import mongoose, { Schema, model } from "mongoose";

const listingsSchema = new Schema({
  url: { type: String },
  price: { type: Number },
  location: { type: String },
  listedBy: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  description: { type: String },
  amenites: { type: [String] },
});

export const Listings = model("Listings", listingsSchema);

export default Listings;
