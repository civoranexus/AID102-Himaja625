import { Router } from "express";

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

router.post("/", (req, res) => {
  const { nitrogen, phosphorus, potassium, ph, moisture } = req.body;

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

  res.json({
    score,
    overallStatus,
    statuses,
    recommendations,
  });
});

export default router;