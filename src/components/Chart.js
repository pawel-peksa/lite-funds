import { Paper, Typography } from "@mui/material";
import { subDays, parseISO, format } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [];

for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random(),
  });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Paper elevation={14} sx={{ p: 2 }}>
        <Typography variant="body2">
          {format(parseISO(label), "eeee, d MMM, yyyy")}
        </Typography>
        <Typography variant="body1" color="primary.main">
          $ {payload[0].value.toFixed(2)} USD
        </Typography>
      </Paper>
    );
  }
  return null;
};

export const Chart = ({ asset }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="primary.main" sx={{ ml: 8, pb: 1 }}>
        {asset.name ? asset.name : "Select asset to plot"}
      </Typography>
      <ResponsiveContainer width="99%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#009688" stopOpacity={0.7}></stop>
              <stop offset="95%" stopColor="#009688" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#009688" fill="url(#color)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 7 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.3} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};
