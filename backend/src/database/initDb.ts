import { dbPromise } from "./db";

export async function initDb() {
  const db = await dbPromise;

  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Soil analysis history linked to user
  await db.exec(`
    CREATE TABLE IF NOT EXISTS soil_analysis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      nitrogen REAL,
      phosphorus REAL,
      potassium REAL,
      ph REAL,
      moisture REAL,
      score INTEGER,
      overall_status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log("✅ Database initialized");
}