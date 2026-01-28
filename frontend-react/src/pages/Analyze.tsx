import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

type FormState = {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  moisture: string;
};

export default function Analyze() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    moisture: "",
  });

  const isValid =
    Object.values(form).every((v) => v !== "") &&
    Number(form.ph) >= 0 &&
    Number(form.ph) <= 14;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setError(null);
    setLoading(true);

    try {
      const result = await apiRequest(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          body: JSON.stringify({
            nitrogen: Number(form.nitrogen),
            phosphorus: Number(form.phosphorus),
            potassium: Number(form.potassium),
            ph: Number(form.ph),
            moisture: Number(form.moisture),
          }),
        }
      );

      navigate("/results", { state: result });
    } catch (err) {
      setError("We couldn’t analyze your soil right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Analyze Your Soil
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {[
          ["Nitrogen (%)", "nitrogen", 0, 100],
          ["Phosphorus (%)", "phosphorus", 0, 100],
          ["Potassium (%)", "potassium", 0, 100],
          ["pH (0–14)", "ph", 0, 14],
          ["Moisture (%)", "moisture", 0, 100],
        ].map(([label, key, min, max]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type="number"
              min={min}
              max={max}
              value={form[key as keyof FormState]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          disabled={!isValid || loading}
          className={`w-full py-3 rounded font-medium text-white ${
            isValid
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Soil"}
        </button>
      </form>
    </div>
  );
}