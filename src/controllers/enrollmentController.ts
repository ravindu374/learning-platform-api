import {
  Request,
  Response,
} from "express";

import {
  pool,
} from "../config/db";

export const enrollSubject =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      user_id,
      subject_id,
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO enrollments
        (
          user_id,
          subject_id
        )
        VALUES
        (
          $1,$2
        )
        RETURNING *
        `,
        [
          user_id,
          subject_id,
        ]
      );

    res.json(
      result.rows[0]
    );
  };

export const getEnrollments =
  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await pool.query(
        `
        SELECT
          e.id,
          s.id AS subject_id,
          s.name,
          s.lecturer
        FROM enrollments e
        JOIN subjects s
        ON e.subject_id = s.id
        WHERE e.user_id = $1
        `,
        [req.params.userId]
      );

    res.json(
      result.rows
    );
  };

export const checkEnrollment =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      userId,
      subjectId,
    } = req.params;

    const result =
      await pool.query(
        `
        SELECT *
        FROM enrollments
        WHERE user_id = $1
        AND subject_id = $2
        `,
        [
          userId,
          subjectId,
        ]
      );

    res.json({
      enrolled:
        result.rows.length > 0,
    });
  };  