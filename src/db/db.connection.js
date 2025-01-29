import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("DB Connected successfully");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};

export { pool, connectDB };


