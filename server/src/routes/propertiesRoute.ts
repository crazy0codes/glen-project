import { Request, Response, Router } from "express";
import { propertyController } from "../controller/indexController";

const router = Router();

//Property related routes
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Property route is working" });
});
router.post("/upload", propertyController.save);
router.get("/properties", propertyController.getAll);
router.get("/listedBy/:listedBy", propertyController.listedBy);
router.get("/bookedBy", propertyController.bookedBy);
router.post("/book/:propertyId", propertyController.buy)

export default router;
