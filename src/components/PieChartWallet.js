import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PieChartWallet = ({ assets }) => {
  let data1 = assets.map((asset) => {
    return { name: asset.name, value: asset.buySell[1] };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data1}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="teal"
        >
          {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
