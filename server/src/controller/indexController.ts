import UserController from "./userController";
import UserModel from "../models/userModel";
import PropertyController from "./propertyController";
import PropertyModel from "../models/propertyModel";


export const userController = new UserController(new UserModel)
export const propertyController = new PropertyController(new PropertyModel)

export default {
    userController,
    propertyController
}