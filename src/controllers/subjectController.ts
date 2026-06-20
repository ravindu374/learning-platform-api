import { Request, Response } from "express";
import { pool } from "../config/db";

export const getSubjects = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subjects ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch subjects",
    });
  }
};

export const createSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, lecturer } = req.body;

    const result = await pool.query(
      `
      INSERT INTO subjects
      (name, lecturer)
      VALUES ($1, $2)
      RETURNING *
      `,
      [name, lecturer]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create subject",
    });
  }
};

export const updateSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { name, lecturer } =
      req.body;

    const result = await pool.query(
      `
      UPDATE subjects
      SET
        name = $1,
        lecturer = $2
      WHERE id = $3
      RETURNING *
      `,
      [name, lecturer, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update subject",
    });
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM subjects
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message:
        "Subject deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete subject",
    });
  }
};