import { Router } from "express";
import { dbPromise } from "../database/db";

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

router.post("/", async (req, res) => {
  const { nitrogen, phosphorus, potassium, ph, moisture } = req.body;

  // Input validation
  if (
    [nitrogen, phosphorus, potassium, ph, moisture].some(
      (v) => typeof v !== "number"
    )
  ) {
    return res.status(400).json({ error: "Invalid soil data input" });
  }

  // AI rule evaluation
  const statuses = {
    nitrogen: evaluateNitrogen(nitrogen),
    phosphorus: evaluatePhosphorus(phosphorus),
    potassium: evaluatePotassium(potassium),
    ph: evaluatePH(ph),
    moisture: evaluateMoisture(moisture),
  };

  // AI score + label
  const score = calculateOverallScore(Object.values(statuses));
  const overallStatus = getHealthLabel(score);

  // Recommendations
  const recommendations = generateRecommendations(statuses);

  // SAVE RESULT TO SQLITE DATABASE
  try {
    const db = await dbPromise;

    await db.run(
      `
      INSERT INTO soil_analysis (
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        overall_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nitrogen,
        phosphorus,
        potassium,
        ph,
        moisture,
        score,
        overallStatus,
      ]
    );
  } catch (error) {
    console.error("Database insert failed:", error);
    return res.status(500).json({ error: "Failed to save analysis" });
  }

  // Send response to frontend
  res.json({
    score,
    overallStatus,
    statuses,
    recommendations,
  });
});

export default router;