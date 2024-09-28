import express from "express";
import { isAuthenticatedUser } from "../middleware/authenticate.js";
import {
  paymentController,
  sendStripeApi,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, paymentController);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

export default router;
