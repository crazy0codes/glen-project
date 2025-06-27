import { Request, Response, Router } from "express";
import {
  bookingsController,
  listingsController,
} from "../controller/indexController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";

const router = Router();

//Property related routes
// router.get("/", (req: Request, res: Response) => {
//   res.status(200).json({ message: "Property route is working" });
// });
// router.post("/upload", propertyController.save);
// router.get("/properties", propertyController.getAll);
// router.get("/listedBy/:listedBy", propertyController.listedBy);
// router.get("/bookedBy", propertyController.bookedBy);
// router.post("/book/:propertyId", propertyController.buy)
// router.get("/details/:id", propertyController.getById)

//Listings
router.get("/", listingsController.getAll);
router.get("/listings/:id", listingsController.getDetails);
router.get("/listedBy/:id",authenticate, authorizeRoles("admin", "user"), listingsController.getById);
router.get("/bookedBy",authenticate, authorizeRoles("admin","user"), bookingsController.getById);
router.post("/upload",authenticate,authorizeRoles("admin", "user"),listingsController.save);
router.post("/bookings",authenticate,authorizeRoles("admin", "user"),bookingsController.save);

router.delete("/listing", authenticate, authorizeRoles("admin","user"), listingsController.delete);
router.patch("/listing", authenticate, authorizeRoles("admin","user"), listingsController.update)
export default router;
