import { Request, Response } from "express";
import { compareHash, generateHash } from "../utils/hashUtil";
import { generateToken } from "../utils/authUtil";
import UserModel from "../models/userModel";

class UserController {
  userModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  // Register
  save = async (req: Request, res: Response) => {
    try {
      const { email, password, role = "user" } = req.body;

      const existing = await this.userModel.findByEmail(email);
      if (existing) return res.status(409).json({ message: "Email already exists" });

      const hashedPassword = await generateHash(password);
      const newUser = await this.userModel.save({
        email,
        password: hashedPassword,
        role
      });

      const token = generateToken({ id: newUser._id, email, role });

      res.status(201).json({ success: true, token, data: newUser });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Login
  verify = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userModel.findByEmail(email);
      
      if (!user || !user.password) throw new Error("Invalid credentials");
     
      const isValid = await compareHash(password, user.password);
      if (!isValid) throw new Error("Invalid credentials");

      const token = generateToken({ id: user._id, email: user.email, role: user.role });

      res.status(200).json({ success: true, token, data: user });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  };
}

export default UserController;
