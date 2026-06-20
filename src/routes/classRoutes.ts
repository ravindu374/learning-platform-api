import { Router } from "express";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  isAdmin,
} from "../middleware/adminMiddleware";

import {
  getClasses,
  createClass,
  deleteClass,
  getStudentClasses,
} from "../controllers/classController";

const router = Router();

router.get(
  "/",
  verifyToken,
  getClasses
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  createClass
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteClass
);

router.get(
  "/student/:userId",
  verifyToken,
  getStudentClasses
);

export default router;