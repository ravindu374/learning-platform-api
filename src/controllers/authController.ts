import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../config/db";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const result =
      await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      result.rows.length === 0
    ) {
      return res
        .status(401)
        .json({
          message:
            "Invalid credentials",
        });
    }

    const user =
      result.rows[0];

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res
        .status(401)
        .json({
          message:
            "Invalid credentials",
        });
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,
      id: user.id,
      role: user.role,
      name: user.name,
      is_paid: user.is_paid,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Login failed",
    });
  }
};

export const register = async (
  req: Request,
  res: Response
) => {

  try {
    console.log(req.body);
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      existingUser.rows.length > 0
    ) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const result =
      await pool.query(
        `
        INSERT INTO users
        (
          name,
          email,
          password,
          role
        )
        VALUES
        (
          $1,$2,$3,$4
        )
        RETURNING
        id,
        name,
        email,
        role
        `,
        [
          name,
          email,
          hashedPassword,
          "student",
        ]
      );

    res.status(201).json(
      result.rows[0]
    );

  } catch (error: any) {

  console.error(
    "REGISTER ERROR:",
    error
  );

  res.status(500).json({
    message:
      error.message,
  });

}

};