type Props = {
  stability: number;
  consistency: number;
  samples: number;
};

export default function ConfidenceBreakdown({
  stability,
  consistency,
  samples,
}: Props) {
  const sampleScore = Math.min(100, samples * 10);

  const items = [
    {
      label: "Stability",
      value: stability,
      weight: 40,
      color: "bg-emerald-500",
      description:
        "Measures how steady soil scores are over time.",
    },
    {
      label: "Consistency",
      value: consistency,
      weight: 40,
      color: "bg-sky-500",
      description:
        "Tracks how often soil health remains acceptable.",
    },
    {
      label: "Data Volume",
      value: sampleScore,
      weight: 20,
      color: "bg-violet-500",
      description:
        "More samples increase confidence reliability.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6 animate-fade-in">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">
        How Confidence Is Calculated
      </h4>

      <div className="space-y-4">
        {items.map(item => {
          const contribution = Math.round(
            (item.value * item.weight) / 100
          );

          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>
                  {item.label} ({item.weight}%)
                </span>
                <span>{contribution}%</span>
              </div>

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}