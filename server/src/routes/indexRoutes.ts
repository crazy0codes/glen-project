import { Router } from "express";
import userRoutes from "./userRoute"
import propertyRoutes from "./propertiesRoute"

const router = Router();

//Collection of all routes
router.use('/user',userRoutes)
router.use('/property',propertyRoutes)

export default router;