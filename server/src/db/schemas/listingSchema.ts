import { Schema, model } from "mongoose";

const listingsSchema = new Schema({
  url: { type: String },
  price: { type: Number },
  location: { type: String },
  listedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
});

export const Listings = model("Listings", listingsSchema);

export default Listings;
