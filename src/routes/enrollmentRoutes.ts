import {
  Router,
} from "express";

import {
  enrollSubject,
  getEnrollments,
} from "../controllers/enrollmentController";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  checkEnrollment,
} from "../controllers/enrollmentController"; 

const router =
  Router();

router.post(
  "/",
  verifyToken,
  enrollSubject
);

router.get(
  "/:userId",
  verifyToken,
  getEnrollments
);

router.get(
  "/check/:userId/:subjectId",
  verifyToken,
  checkEnrollment
);

export default router;
