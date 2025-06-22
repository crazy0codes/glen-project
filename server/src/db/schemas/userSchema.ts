import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type:String, require: true}
    }
)

export const User = model("User", userSchema);

export default User;