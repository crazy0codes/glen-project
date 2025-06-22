import { Request, Response } from "express";
import { compareHash, generateHash } from "../utils/hashUtil";
import UserModel from "../models/userModel";

class UserController {
  userModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  //Create a new User
  createUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await generateHash(password);
      const newUser = await this.userModel.save({
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  //Check user exists
  getUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await generateHash(password);
      const user = await this.userModel.findByEmail(email);

      if (user && user.password) {
        const isUser = await compareHash(password, user.password);

        if (!isUser) throw new Error("Invalid credentials")

          res.status(201).json({
            success: true,
            data: user,
        });
      }
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

}

export default UserController