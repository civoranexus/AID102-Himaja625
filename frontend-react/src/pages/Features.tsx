import FeatureCard from "../components/FeatureCard";

export default function Features() {
  const features = [
    {
      title: "Comprehensive Nutrient Analysis",
      description: "Insights into nitrogen, phosphorus, potassium and more."
    },
    {
      title: "Visual Health Dashboard",
      description: "Clear indicators to understand soil health instantly."
    },
    {
      title: "AI-Powered Recommendations",
      description: "Smart suggestions to improve soil fertility."
    },
    {
      title: "pH & Moisture Optimization",
      description: "Balanced conditions for better crop growth."
    },
    {
      title: "Disease Prevention",
      description: "Early warnings and preventive strategies."
    },
    {
      title: "Sustainable Practices",
      description: "Eco-friendly guidance for long-term soil health."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-12">
        Everything You Need for <span className="text-teal-600">Healthy Soil</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </div>
  );
}