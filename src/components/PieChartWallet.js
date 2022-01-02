import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const data2 = [
//   { name: "A1", value: 100 },
//   { name: "A2", value: 300 },
//   { name: "B1", value: 100 },
//   { name: "B2", value: 80 },
//   { name: "B3", value: 40 },
//   { name: "B4", value: 30 },
//   { name: "B5", value: 50 },
//   { name: "C1", value: 100 },
//   { name: "C2", value: 200 },
//   { name: "D1", value: 150 },
//   { name: "D2", value: 50 },
// ];

export const PieChartWallet = ({ assets }) => {
  let data1 = assets.map((asset) => {
    return { name: asset.name, value: asset.buySell[1] };
  });

  let cryptoAssets = assets.filter((asset) => asset.type === "crypto");
  let cryptoValue = 0;
  if (cryptoAssets.length > 0) {
    cryptoValue = cryptoAssets.reduce((a, b) => a.buySell[1] + b.buySell[1]);
  }

  let stocksAssets = assets.filter((asset) => asset.type === "stock");
  let stocksValue = 0;
  if (stocksAssets.length > 0) {
    stocksValue = stocksAssets.reduce((a, b) => a.buySell[1] + b.buySell[1]);
  }

  let data2 = [
    { name: "crypto", value: cryptoValue },
    { name: "stocks", value: stocksValue },
  ];

  // let data1 = assets.map((asset) => {
  //   return { name: asset.name, value: asset.buySell[1] };
  // });

  // const data1 = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  // ];

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
          label
        />
        <Pie
          data={data2}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={61}
          outerRadius={67}
          fill="#82ca9d"
        >
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
