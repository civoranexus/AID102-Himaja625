interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        {description}
      </p>
    </div>
  );
}