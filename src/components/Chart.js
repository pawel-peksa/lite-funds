import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { parseISO, format } from "date-fns";
import { fetchDailyAdjusted } from "../api/fetchDailyAdjusted";
import { fetchWeeklyAdjusted } from "../api/fetchWeeklyAdjusted";
import { fetchMonthlyAdjusted } from "../api/fetchMonthlyAdjusted";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import getSymbolFromCurrency from "currency-symbol-map";
import { ApiSnackbar } from "./ApiSnackbar";

const CustomLabel = () => {
  return (
    <div style={{ widht: 200, height: 200, border: "1px solid red" }}>
      LABEL
    </div>
  );
};
const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active) {
    let data = label;
    if (label !== 0 && label !== "auto") {
      data = format(parseISO(label), "eeee, d MMM, yyyy");
    }

    return (
      <Paper elevation={14} sx={{ p: 2 }}>
        <Typography variant="body2">{data}</Typography>
        <Typography align="center" variant="body1" color="primary.main">
          {getSymbolFromCurrency(currency)}
          {payload && payload[0].value.toFixed(2)}
        </Typography>
      </Paper>
    );
  }
  return null;
};

export const Chart = ({ asset }) => {
  const [interval, setInterval] = useState("3M");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState();
  const [message, setMessage] = useState("Performance: ");
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    switch (interval) {
      case "1M": {
        fetchDailyAdjusted(
          asset.symbol,
          setData,
          setPerformance,
          setIsLoading,
          true,
          setSnackbar
        );
        setMessage("1 Month performance: ");
        break;
      }
      case "3M": {
        fetchDailyAdjusted(
          asset.symbol,
          setData,
          setPerformance,
          setIsLoading,
          false,
          setSnackbar
        );
        setMessage("3 Months performance: ");
        break;
      }
      case "1Y": {
        fetchWeeklyAdjusted(
          asset.symbol,
          setData,
          setPerformance,
          setIsLoading,
          true,
          setSnackbar
        );
        setMessage("1 Year performance: ");
        break;
      }
      case "5Y": {
        fetchWeeklyAdjusted(
          asset.symbol,
          setData,
          setPerformance,
          setIsLoading,
          false,
          setSnackbar
        );
        setMessage("5 Years performance: ");
        break;
      }
      default: {
        fetchMonthlyAdjusted(
          asset.symbol,
          setData,
          setPerformance,
          setIsLoading,
          setSnackbar
        );
        setMessage("All time performance: ");
        break;
      }
    }
  }, [asset, interval]);
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            color={isLoading ? "secondary.light" : "primary.main"}
            sx={{ ml: 8, pb: 1 }}
          >
            {asset.name
              ? `${asset.symbol} - ${asset.name} (${asset.currency})`
              : "Select asset to plot"}
          </Typography>
          {isLoading && (
            <CircularProgress sx={{ ml: 2 }} thickness={3} size={30} />
          )}
        </Box>
        <Box>
          <Button
            variant={interval === "1M" ? "outlined" : "text"}
            onClick={() => setInterval(() => "1M")}
            sx={{ minWidth: "40px" }}
          >
            1M
          </Button>
          <Button
            variant={interval === "3M" ? "outlined" : "text"}
            onClick={() => setInterval(() => "3M")}
            sx={{ minWidth: "40px" }}
          >
            3M
          </Button>
          <Button
            variant={interval === "1Y" ? "outlined" : "text"}
            onClick={() => setInterval(() => "1Y")}
            sx={{ minWidth: "40px" }}
          >
            1Y
          </Button>
          <Button
            variant={interval === "5Y" ? "outlined" : "text"}
            onClick={() => setInterval(() => "5Y")}
            sx={{ minWidth: "40px" }}
          >
            5Y
          </Button>
          <Button
            variant={interval === "ALL" ? "outlined" : "text"}
            onClick={() => setInterval(() => "ALL")}
            sx={{ minWidth: "40px" }}
          >
            All
          </Button>
        </Box>
      </Box>
      <Typography sx={{ pb: 1 }} variant="body1" align="center">
        {message}
        <span style={{ color: performance < 0 ? "red" : "teal" }}>
          {performance}%
        </span>
      </Typography>

      <ResponsiveContainer width="99%" height={350}>
        <AreaChart
          data={data}
          margin={{
            right: 55,
            left: 25,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#009688" stopOpacity={0.7}></stop>
              <stop offset="95%" stopColor="#009688" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>

          <Area dataKey="value" stroke="#009688" fill="url(#color)" />
          <ReferenceLine
            y={data && data.at(-1)?.value}
            label={{
              position: "right",
              value:
                getSymbolFromCurrency(asset.currency) +
                data.at(-1)?.value.toFixed(1),
              fill: "grey",
              fontSize: 13,
            }}
            stroke="lightgrey"
          />
          <ReferenceLine
            y={data && data.at(0)?.value}
            label={{
              position: "right",
              value:
                getSymbolFromCurrency(asset.currency) +
                data.at(0)?.value.toFixed(1),
              fill: "#6c9df5",
              fontSize: 13,
            }}
            stroke="#acddff"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            reversed={true}
            angle={-30}
            dx={5}
            dy={5}
            tickFormatter={(str) => {
              // before print check for correct data type
              if (str !== 0 && str !== "auto") {
                return format(parseISO(str), "dd MMM");
              }
              return str;
            }}
          />
          <YAxis
            width={70}
            dataKey="value"
            domain={["auto", "auto"]}
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) =>
              `${getSymbolFromCurrency(asset.currency)}${number.toFixed(2)}`
            }
          />
          <Tooltip content={<CustomTooltip currency={asset.currency} />} />
          <CartesianGrid opacity={0.3} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
      <ApiSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Paper>
  );
};