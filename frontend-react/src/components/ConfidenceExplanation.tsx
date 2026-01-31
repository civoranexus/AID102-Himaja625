type Props = {
  confidence: number;
  stability: number;
  consistency: number;
  samples: number;
  weakest: {
    label: string;
    reason: string;
  };
};

export default function ConfidenceExplanation({
  confidence,
  stability,
  consistency,
  samples,
  weakest,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">
        Confidence Explanation
      </h4>

      <p className="text-sm text-slate-600 leading-relaxed">
        The confidence score of{" "}
        <span className="font-medium">{confidence}%</span> is derived from
        historical soil data analysis. Stability is currently{" "}
        <span className="font-medium">{stability}%</span>, while consistency
        stands at <span className="font-medium">{consistency}%</span>, based on{" "}
        <span className="font-medium">{samples}</span> total samples.
      </p>

      <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
        <strong>Limiting factor:</strong> {weakest.label} — {weakest.reason}
      </div>
    </div>
  );
}