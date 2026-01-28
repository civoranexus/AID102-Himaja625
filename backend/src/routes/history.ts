import { Router } from "express";
import { dbPromise } from "../database/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const db = await dbPromise;

    const rows = await db.all(
      `
      SELECT
        score,
        prev_score,
        delta_score,
        overall_status,
        created_at
      FROM soil_analysis
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;