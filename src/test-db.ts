import { pool } from "./config/db";

async function test() {
  try {
    const result =
      await pool.query(
        "SELECT NOW()"
      );

    console.log(
      "Connected Successfully"
    );

    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

test();