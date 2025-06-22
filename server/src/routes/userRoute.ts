import { Router } from "express";
import { userController } from "../controller/indexController";

const router = Router();

//User related routes
router.post("/create", userController.createUser);
router.get("/:id", userController.getUserByEmail);

export default router;

