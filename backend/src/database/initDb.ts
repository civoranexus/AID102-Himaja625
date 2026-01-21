import { dbPromise } from "./db";

export async function initDb() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS soil_analysis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nitrogen REAL,
      phosphorus REAL,
      potassium REAL,
      ph REAL,
      moisture REAL,
      score INTEGER,
      overall_status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Database initialized");
}