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

/**
 * POST /api/analyze
 * Protected route – saves soil analysis for logged-in user
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, ph, moisture } = req.body;

    const userId = (req as any).user.id;

    // Validate input
    if (
      [nitrogen, phosphorus, potassium, ph, moisture].some(
        (v) => typeof v !== "number"
      )
    ) {
      return res.status(400).json({
        error: "Invalid soil data input",
      });
    }

    // Rule-based evaluation
    const statuses = {
      nitrogen: evaluateNitrogen(nitrogen),
      phosphorus: evaluatePhosphorus(phosphorus),
      potassium: evaluatePotassium(potassium),
      ph: evaluatePH(ph),
      moisture: evaluateMoisture(moisture),
    };

    // Score + label
    const score = calculateOverallScore(Object.values(statuses));
    const overallStatus = getHealthLabel(score);

    const recommendations = generateRecommendations(statuses);

    // Save to DB with user_id
    const db = await dbPromise;
    await db.run(
      `
      INSERT INTO soil_analysis
      (user_id, nitrogen, phosphorus, potassium, ph, moisture, score, overall_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        overallStatus,
      ]
    );

    // Respond to frontend
    res.json({
      score,
      overallStatus,
      statuses,
      recommendations,
    });
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({
      error: "Failed to analyze soil",
    });
  }
});

export default router;