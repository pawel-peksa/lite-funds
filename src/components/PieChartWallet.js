import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from "recharts";
import { Typography } from "@mui/material";
import { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="teal"
      >{`${getSymbolFromCurrency("eur")}${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PieChartWallet = ({ assets }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  let stocksBalance = assets
    .filter((asset) => asset.type === "stocks")
    .map((stock) => stock.value)
    .reduce((a, b) => a + b, 0);

  let cryptoBalance = assets
    .filter((asset) => asset.type === "crypto")
    .map((crypto) => crypto.value)
    .reduce((a, b) => a + b, 0);

  const onPieEnter = (e, index) => {
    setActiveIndex(index);
  };

  // TODO implement bonds when API available
  // let bondBalance = assets
  //   .filter((asset) => asset.type === "bonds")
  //   .map((bond) => bond.value)
  //   .reduce((a, b) => a + b);

  let data1 = [
    { name: "crypto", value: Number(cryptoBalance.toFixed(2)) },
    { name: "stocks", value: Number(stocksBalance.toFixed(2)) },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="75%">
        <PieChart width={400} height={200}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data1}
            dataKey="value"
            cx="50%"
            cy="85%"
            paddingAngle={2}
            outerRadius={60}
            innerRadius={40}
            fill="teal"
            startAngle={180}
            endAngle={0}
            onMouseEnter={onPieEnter}
          >
            {data1.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Typography
        sx={{ fontSize: 16 }}
        variant="h5"
        component="p"
        color="secondary.main"
        align="center"
        // gutterBottom
      >
        portfolio diversification
      </Typography>
    </>
  );
};
