import express from "express"

import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer"
import { addMenu, editMenu } from "../controller/menu_controller";

const router=express.Router();

router.route("/").post(isAuthenticated as any ,upload.single("image"),addMenu as any);

router.route("/:id").post(isAuthenticated as any ,upload.single("image"),editMenu as any);


export default router;