import { Router } from "express";
import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  isAdmin,
} from "../middleware/adminMiddleware";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController";

const router = Router();

router.get(
  "/",
  verifyToken,
  getSubjects
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  createSubject
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateSubject
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteSubject
);

export default router;