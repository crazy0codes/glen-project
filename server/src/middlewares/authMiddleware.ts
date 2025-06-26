import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtil";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    console.log(decoded)
    next();
  } catch (err: any) {
    console.log(err)
    res.status(401).json({
      success: false,
      message: err.message,
    });
    return;
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
      return;
    }

    next();
  };
};
