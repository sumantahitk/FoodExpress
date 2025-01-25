import express from "express"

import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer"
import { addMenu, editMenu, getMenu } from "../controller/menu_controller";

const router=express.Router();

router.route("/").post(isAuthenticated as any ,upload.single("imagemenu"),addMenu as any);

router.route("/").get(isAuthenticated as any ,getMenu as any);
router.route("/:id").put(isAuthenticated as any ,upload.single("imagemenu"),editMenu as any);


export default router;