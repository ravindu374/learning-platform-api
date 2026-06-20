import bcrypt from "bcryptjs";
import { pool } from "../config/db";

async function createAdmin() {
  const hashedPassword =
    await bcrypt.hash(
      "admin123",
      10
    );

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
    `,
    [
      "Administrator",
      "admin@lms.com",
      hashedPassword,
      "admin",
    ]
  );

  console.log(
    "Admin Created"
  );

  process.exit();
}

createAdmin();