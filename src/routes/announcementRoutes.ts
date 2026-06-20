import { Router } from "express";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  isAdmin,
} from "../middleware/adminMiddleware";

import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getStudentAnnouncements,
} from "../controllers/announcementController";

const router = Router();

router.get(
  "/",
  verifyToken,
  getAnnouncements
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  createAnnouncement
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteAnnouncement
);

router.get(
  "/student/:userId",
  verifyToken,
  getStudentAnnouncements
);

export default router;