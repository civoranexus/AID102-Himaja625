import { Router } from "express";
import { dbPromise } from "../database/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.id;
    const range = (req.query.range as string) || "daily";
    const db = await dbPromise;

    let query = "";

    if (range === "weekly") {
      query = `
        SELECT
          strftime('%Y-%W', created_at) AS period,
          ROUND(AVG(score), 2) AS score,
          COUNT(*) AS samples,
          MAX(created_at) AS created_at
        FROM soil_analysis
        WHERE user_id = ?
        GROUP BY period
        ORDER BY period ASC
      `;
    } else if (range === "monthly") {
      query = `
        SELECT
          strftime('%Y-%m', created_at) AS period,
          ROUND(AVG(score), 2) AS score,
          COUNT(*) AS samples,
          MAX(created_at) AS created_at
        FROM soil_analysis
        WHERE user_id = ?
        GROUP BY period
        ORDER BY period ASC
      `;
    } else {
      query = `
        SELECT
          score,
          prev_score,
          delta_score,
          overall_status,
          created_at
        FROM soil_analysis
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;
    }

    const rows = await db.all(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;