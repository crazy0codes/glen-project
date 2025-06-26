import { Router } from "express";
import { userController } from "../controller/indexController";

const router = Router();

//User related routes
router.post("/register", userController.save);
router.post("/login", userController.verify);

export default router;

