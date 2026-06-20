import { Request, Response }
from "express";

import { pool }
from "../config/db";

export const getUsers =
  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await pool.query(
        `
        SELECT
        id,
        name,
        email,
        role
        FROM users
        ORDER BY id
        `
      );

    res.json(
      result.rows
    );

  };

export const deleteUser =
  async (
    req: Request,
    res: Response
  ) => {

    await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [req.params.id]
    );

    res.json({
      message:
        "User deleted",
    });

  };