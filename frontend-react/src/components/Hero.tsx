import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-28 text-center">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
          AI-Powered Soil Analysis
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Intelligent Soil{" "}
          <span className="text-teal-600">Health Analyzer</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
          Data-driven insights into soil nutrients, moisture, and pH
          to empower smarter farming decisions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate("/analyze")}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
          >
            Analyze Your Soil →
          </button>

          <button
            onClick={() => navigate("/about")}
            className="border border-slate-300 px-6 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}