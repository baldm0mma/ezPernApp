import pg from "pg";
const { Client } = pg;

export const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "postgres",
});

// Connect to PostgreSQL DB
client.connect();
