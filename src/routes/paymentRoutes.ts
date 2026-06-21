import express from "express";

import {
  getEnrollmentsWithPayment,
  updateEnrollmentPayment,
} from "../controllers/paymentController";

const router =
  express.Router();

router.get(
  "/",
  getEnrollmentsWithPayment
);

router.put(
  "/:id",
  updateEnrollmentPayment
);

export default router;