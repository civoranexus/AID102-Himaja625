import { Router } from "express";
import { dbPromise } from "../database/db";

const router = Router();

/**
 * GET /api/history
 * Returns last soil analyses (latest first)
 */
router.get("/", async (_req, res) => {
  try {
    const db = await dbPromise;

    const rows = await db.all(`
      SELECT
        id,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        overall_status,
        created_at
      FROM soil_analysis
      ORDER BY created_at DESC
      LIMIT 20
    `);

    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;