import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";

const CustomTooltip = ({ active, payload, dataKey }) => {
  if (active) {
    return (
      <Paper elevation={14} sx={{ p: 2, minWidth: 120 }}>
        <Typography variant="body2" color="secondary.main" align="center">
          {payload[0].payload.type}
        </Typography>
        <Typography align="center" variant="body2">
          {payload[0].payload.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          color={payload[0].value > 0 ? "primary.main" : "red"}
        >
          {dataKey === "value"
            ? payload[0].value + getSymbolFromCurrency("eur")
            : `${payload[0].payload.pl}${getSymbolFromCurrency(
                "eur"
              )} (${payload[0].payload.plp.toFixed(2)}%)`}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const CustomBar = (props) => {
  const { dataKey, fill, pl } = props;
  let color = fill;
  if (dataKey === "pl" && pl < 0) {
    color = "red";
  }

  return <Rectangle {...props} fill={color} />;
};

export const BarChartWallet = ({ assets }) => {
  const [dataKey, setDataKey] = useState("value");
  let value;
  let pl;
  if (assets.length > 0) {
    value = [...assets].sort((a, b) => a.value - b.value);
    pl = [...assets].sort((a, b) => a.pl - b.pl);
  }

  return (
    <>
      <ResponsiveContainer width="100%" height="93%">
        <BarChart
          layout="vertical"
          data={dataKey === "value" ? value : pl}
          margin={{
            top: 20,
            right: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 0" horizontal={false} />
          <XAxis
            type="number"
            dataKey={dataKey}
            tickFormatter={(number) =>
              `${getSymbolFromCurrency("eur")}${number}`
            }
          />
          <YAxis type="category" dataKey="symbol" />
          <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
          {/* <Bar dataKey={dataKey} fill="#607d8b"></Bar> */}
          <Bar
            shape={<CustomBar dataKey={dataKey} />}
            dataKey={dataKey}
            fill="#607d8b"
          />
        </BarChart>
      </ResponsiveContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          color={dataKey === "value" ? "primary" : "secondary"}
          onClick={() => setDataKey("value")}
        >
          value
        </Button>
        <Button
          color={dataKey === "pl" ? "primary" : "secondary"}
          onClick={() => setDataKey("pl")}
        >
          performance
        </Button>
      </Box>
    </>
  );
};
