import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import classRoutes from "./routes/classRoutes";
import quizRoutes from "./routes/quizRoutes";
import announcementRoutes from "./routes/announcementRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/classes", classRoutes);

app.use("/api/quizzes", quizRoutes);

app.use("/api/announcements", announcementRoutes);

app.use("/api/enrollments", enrollmentRoutes);

app.get("/", (_, res) => {
  res.json({
    message: "Learning Platform API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});