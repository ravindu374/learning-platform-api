import { Request, Response } from "express";
import { pool } from "../config/db";

export const getClasses = async (
  req: Request,
  res: Response
) => {
  const result = await pool.query(
    "SELECT * FROM classes ORDER BY id"
  );

  res.json(result.rows);
};

export const createClass = async (
  req: Request,
  res: Response
) => {
  const {
    title,
    class_date,
    class_time,
    zoom_link,
    subject_id,
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO classes
      (
        title,
        class_date,
        class_time,
        zoom_link,
        subject_id
      )
      VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      title,
      class_date,
      class_time,
      zoom_link,
      subject_id,
    ]
  );

  res.json(result.rows[0]);
};

export const deleteClass = async (
  req: Request,
  res: Response
) => {
  await pool.query(
    "DELETE FROM classes WHERE id=$1",
    [req.params.id]
  );

  res.json({
    message: "Deleted",
  });
};

export const getStudentClasses =
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
          c.*
        FROM classes c
        JOIN enrollments e
          ON c.subject_id = e.subject_id
        WHERE
          e.user_id = $1
          AND e.is_paid = TRUE
        ORDER BY c.class_date
        `,
        [userId]
      );

    res.json(
      result.rows
    );
  };