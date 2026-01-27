import { Router } from "express";
import { dbPromise } from "../database/db";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  evaluateNitrogen,
  evaluatePhosphorus,
  evaluatePotassium,
  evaluatePH,
  evaluateMoisture,
} from "../ai/soilRules";

import { calculateOverallScore, getHealthLabel } from "../ai/scoreEngine";
import { generateRecommendations } from "../ai/recommendations";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, ph, moisture } = req.body;
    const userId = req.user!.id;

    if (
      [nitrogen, phosphorus, potassium, ph, moisture].some(
        (v) => typeof v !== "number"
      )
    ) {
      return res.status(400).json({ error: "Invalid soil data input" });
    }

    const statuses = {
      nitrogen: evaluateNitrogen(nitrogen),
      phosphorus: evaluatePhosphorus(phosphorus),
      potassium: evaluatePotassium(potassium),
      ph: evaluatePH(ph),
      moisture: evaluateMoisture(moisture),
    };

    const score = calculateOverallScore(Object.values(statuses));
    const overallStatus = getHealthLabel(score);
    const recommendations = generateRecommendations(statuses);

    const db = await dbPromise;

    // 🔹 Get previous score
    const previous = await db.get(
      `
      SELECT score
      FROM soil_analysis
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [userId]
    );

    const prevScore = previous?.score ?? null;
    const deltaScore =
      prevScore !== null ? Number((score - prevScore).toFixed(2)) : null;

    await db.run(
      `
      INSERT INTO soil_analysis
      (
        user_id,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        prev_score,
        delta_score,
        overall_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        prevScore,
        deltaScore,
        overallStatus,
      ]
    );

    res.json({
      score,
      prevScore,
      deltaScore,
      overallStatus,
      statuses,
      recommendations,
    });
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({ error: "Failed to analyze soil" });
  }
});

export default router;