import { Request, Response } from "express";
import { pool } from "../config/db";

export const getQuizzes = async (
  req: Request,
  res: Response
) => {
  const result = await pool.query(
    "SELECT * FROM quizzes ORDER BY id"
  );

  res.json(result.rows);
};

export const createQuiz = async (
  req: Request,
  res: Response
) => {
  const {
    title,
    deadline,
    form_link,
    subject_id,
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO quizzes
    (
      title,
      deadline,
      form_link,
      subject_id
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      title,
      deadline,
      form_link,
      subject_id
    ]
  );

  res.json(result.rows[0]);
};

export const deleteQuiz = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "DELETE FROM quizzes WHERE id=$1",
    [req.params.id]
  );

  res.json({
    message: "Deleted",
  });
};

export const getStudentQuizzes =
  async (
    req: Request,
    res: Response
  ) => {

    const userId =
      req.params.userId;

    const result =
      await pool.query(
        `
        SELECT
          q.*
        FROM quizzes q
        JOIN enrollments e
          ON q.subject_id = e.subject_id
        WHERE e.user_id = $1
        ORDER BY q.deadline
        `,
        [userId]
      );

    res.json(
      result.rows
    );
  };