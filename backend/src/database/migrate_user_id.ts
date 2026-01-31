import { dbPromise } from "./db";

async function migrate() {
  const db = await dbPromise;

  console.log("🚀 Starting migration...");

  try {
    await db.run(`
      ALTER TABLE soil_analysis
      ADD COLUMN user_id INTEGER
    `);
    console.log("✅ user_id column added");
  } catch (err: any) {
    if (err.message.includes("duplicate column")) {
      console.log("ℹ️ user_id column already exists");
    } else {
      throw err;
    }
  }

  await db.run(`
    UPDATE soil_analysis
    SET user_id = 1
    WHERE user_id IS NULL
  `);

  console.log("✅ Existing rows linked to user_id = 1");
  console.log("🎉 Migration complete");

  process.exit(0);
}

migrate();