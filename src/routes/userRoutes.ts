import { Router }
from "express";

import {
  getUsers,
  deleteUser,
} from "../controllers/userController";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  isAdmin,
} from "../middleware/adminMiddleware";

const router =
  Router();

router.get(
  "/",
  verifyToken,
  isAdmin,
  getUsers
);

export default router;

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteUser
);