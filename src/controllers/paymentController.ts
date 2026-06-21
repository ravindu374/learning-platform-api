import { Request, Response } from "express";
import { pool } from "../config/db";

export const getEnrollmentsWithPayment =
  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await pool.query(
        `
        SELECT
          e.id,
          u.name AS student_name,
          s.name AS subject_name,
          e.is_paid
        FROM enrollments e
        JOIN users u
          ON e.user_id = u.id
        JOIN subjects s
          ON e.subject_id = s.id
        ORDER BY u.name
        `
      );

    res.json(result.rows);

  };

export const updateEnrollmentPayment =
  async (
    req: Request,
    res: Response
  ) => {

    const { id } =
      req.params;

    const {
      is_paid,
    } = req.body;

    const result =
      await pool.query(
        `
        UPDATE enrollments
        SET is_paid = $1
        WHERE id = $2
        RETURNING *
        `,
        [
          is_paid,
          id,
        ]
      );

    res.json(
      result.rows[0]
    );

  };