import { budgetQuery } from "@/types/queries";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartDashboard({
  budgetList,
}: {
  budgetList: budgetQuery[];
}) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      {budgetList.length > 0 ? (
        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart
            data={budgetList}
            margin={{
              top: 7,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" stackId="a" fill="#c3c2ff" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] bg-slate-200 animate-pulse rounded-lg" />
      )}
    </div>
  );
}
