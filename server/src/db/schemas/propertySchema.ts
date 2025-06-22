import { Schema, model } from "mongoose";

const propertySchema = new Schema({
  url: { type: String },
  price: { type: Number },
  location: { type: String },
  listedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: null,
  },
});

export const Property = model("Property", propertySchema);

export default Property;
