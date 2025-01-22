import express from "express"

import { isAuthenticated } from "../middlewares/isAuthenticated";


import { createCheckoutSeason, getOrders } from "../controller/order_controller";

const router=express.Router();

router.route("/").get(isAuthenticated as any ,getOrders as any);

router.route("/checkout/create-checkout-session").post(isAuthenticated as any ,createCheckoutSeason as any);

// router.route("/webhook").post();

export default router;