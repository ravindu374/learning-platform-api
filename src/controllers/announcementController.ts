import { Request, Response } from "express";
import { pool } from "../config/db";

export const getAnnouncements =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await pool.query(
        `
        SELECT *
        FROM announcements
        ORDER BY id DESC
        `
      );

    res.json(result.rows);
  };

export const createAnnouncement =
  async (
    req: Request,
    res: Response
  ) => {
    const {
      title,
      description,
      subject_id,
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO announcements
        (
          title,
          description,
          subject_id
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [
          title,
          description,
          subject_id
        ]
      );

    res.json(
      result.rows[0]
    );
  };

export const deleteAnnouncement =
  async (
    req: Request,
    res: Response
  ) => {
    await pool.query(
      `
      DELETE FROM announcements
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      message:
        "Deleted",
    });
  };

  export const getStudentAnnouncements =
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
            a.*
          FROM announcements a
          JOIN enrollments e
            ON a.subject_id = e.subject_id
          WHERE
            e.user_id = $1
            AND e.is_paid = TRUE
          ORDER BY a.id DESC
        `,
        [userId]
      );

    res.json(
      result.rows
    );
  };