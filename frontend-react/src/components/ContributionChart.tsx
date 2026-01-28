import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ContributionItem = {
  nutrient: string;
  contribution: number;
};

type Props = {
  insights: Record<
    string,
    {
      contribution: number;
    }
  >;
};

export default function ContributionChart({ insights }: Props) {
  const data: ContributionItem[] = Object.entries(insights).map(
    ([key, val]) => ({
      nutrient: key,
      contribution: val.contribution,
    })
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">
        Nutrient Contribution Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="nutrient" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Bar
            dataKey="contribution"
            fill="#14b8a6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}