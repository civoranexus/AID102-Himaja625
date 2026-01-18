type Props = {
  value: number;
};

export default function ScoreRing({ value }: Props) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  let stroke = "#f59e0b"; // yellow
  if (value >= 75) stroke = "#10b981"; // green
  if (value < 50) stroke = "#ef4444"; // red

  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={stroke}
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="#0f172a"
      >
        {value}%
      </text>
    </svg>
  );
}