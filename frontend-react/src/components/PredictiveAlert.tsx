type Props = {
  alert: {
    level: "positive" | "warning" | "danger";
    title: string;
    message: string;
  };
};

export default function PredictiveAlert({ alert }: Props) {
  const styles = {
    positive: {
      border: "border-green-200",
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "🟢",
    },
    warning: {
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: "🟡",
    },
    danger: {
      border: "border-red-200",
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "🔴",
    },
  }[alert.level];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border}
        border rounded-xl p-5
        animate-fade-in
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{styles.icon}</span>
        <div>
          <h4 className={`font-semibold ${styles.text}`}>
            {alert.title}
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            {alert.message}
          </p>
        </div>
      </div>
    </div>
  );
}