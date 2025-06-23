import { Request, Response, Router } from "express";
import { bookingsController, listingsController, propertyController } from "../controller/indexController";

const router = Router();

//Property related routes
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Property route is working" });
});
// router.post("/upload", propertyController.save);
// router.get("/properties", propertyController.getAll);
// router.get("/listedBy/:listedBy", propertyController.listedBy);
// router.get("/bookedBy", propertyController.bookedBy);
// router.post("/book/:propertyId", propertyController.buy)
// router.get("/details/:id", propertyController.getById)


//Listings
router.get("/", listingsController.getAll);
router.post("/upload", listingsController.save);
router.get("/listedBy/:listedBy", listingsController.getById)
router.get("/bookedBy", bookingsController.getById);
router.post("/book/:propertyId", bookingsController.save);
router.get("/details/:id", listingsController.getDetails)

export default router;
