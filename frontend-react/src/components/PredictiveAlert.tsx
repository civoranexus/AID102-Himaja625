type PredictiveAlertType = {
  level: "positive" | "warning" | "danger";
  title: string;
  message: string;
  confidence: number;
  confidenceLabel: "Low" | "Medium" | "High";
  explanation: string;
};

type Props = {
  alert: PredictiveAlertType;
};

export default function PredictiveAlert({ alert }: Props) {
  const styles = {
    positive: {
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
      icon: "🟢",
    },
    warning: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
      icon: "🟡",
    },
    danger: {
      border: "border-red-200",
      bg: "bg-red-50",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700",
      icon: "🔴",
    },
  }[alert.level];

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-2xl p-5 animate-fade-in`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">{styles.icon}</span>

          <div>
            <h4 className={`font-semibold ${styles.text}`}>
              {alert.title}
            </h4>

            <p className="text-sm text-slate-600 mt-1">
              {alert.message}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              {alert.explanation}
            </p>
          </div>
        </div>

        <div className={`${styles.badge} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
          Confidence: {alert.confidenceLabel} ({alert.confidence}%)
        </div>
      </div>
    </div>
  );
}