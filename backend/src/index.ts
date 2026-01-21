import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze";
import { initDb } from "./database/initDb";
import historyRoute from "./routes/history";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);
app.use("/api/history", historyRoute);

const PORT = 5000;

app.listen(PORT, async () => {
  await initDb();
  console.log(`✅ SoilSense backend running on port ${PORT}`);
});