import { Router } from "express";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  isAdmin,
} from "../middleware/adminMiddleware";

import {
  getQuizzes,
  createQuiz,
  deleteQuiz,
  getStudentQuizzes,
} from "../controllers/quizController";

const router = Router();

router.get(
  "/",
  verifyToken,
  getQuizzes
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  createQuiz
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteQuiz
);

router.get(
  "/student/:userId",
  verifyToken,
  getStudentQuizzes
);

export default router;