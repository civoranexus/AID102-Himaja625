import { dbPromise } from "./db";

async function migrate() {
  const db = await dbPromise;

  console.log("🚀 Starting analytics migration...");

  const columns = [
    { name: "prev_score", type: "REAL" },
    { name: "delta_score", type: "REAL" },
  ];

  for (const col of columns) {
    try {
      await db.run(
        `ALTER TABLE soil_analysis ADD COLUMN ${col.name} ${col.type}`
      );
      console.log(`✅ Column added: ${col.name}`);
    } catch (err: any) {
      if (err.message.includes("duplicate column")) {
        console.log(`ℹ️ Column already exists: ${col.name}`);
      } else {
        throw err;
      }
    }
  }

  console.log("🎉 Analytics migration complete");
  process.exit(0);
}

migrate();