import { Paper, Typography, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { parseISO, format } from "date-fns";
import { useState, useEffect } from "react";
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
import { getCryptoHistory } from "../api/cryptoApi";

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

export const ChartCrypto = ({ from, to, showPlot, setShowPlot }) => {
  const [interval, setInterval] = useState("3M");
  const [data, setData] = useState([]);
  const [performance, setPerformance] = useState();
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (typeof from === "undefined" || typeof to === "undefined") {
      setShowPlot(false);
    } else if (!!from && !!to) {
      getCryptoHistory(
        from + to,
        interval,
        setData,
        setPerformance,
        setSnackbar,
        setMessage
      );
    }
  }, [interval, from, to, setShowPlot, showPlot]);

  return (
    showPlot && (
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container sx={{ mb: 2, justifyContent: "space-between" }}>
          <Grid item sx={{ ml: 4 }} lg={4}>
            <Typography variant="h6" align="center" color="primary.main">
              {from}/{to}
            </Typography>

            <Typography sx={{ pb: 1 }} variant="body1" align="center">
              {message}
              <span style={{ color: performance < 0 ? "red" : "teal" }}>
                {performance} {!!performance && "%"}
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            lg={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
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
              variant={interval === "ALL" ? "outlined" : "text"}
              onClick={() => setInterval(() => "ALL")}
              sx={{ minWidth: "40px" }}
            >
              All
            </Button>
          </Grid>
        </Grid>
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
                <stop
                  offset="95%"
                  stopColor="#009688"
                  stopOpacity={0.05}
                ></stop>
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#009688" fill="url(#color)" />
            <ReferenceLine
              y={data && data.at(-1)?.value}
              label={{
                position: "right",
                value: data.at(-1)?.value.toFixed(1),
                fill: "grey",
                fontSize: 13,
              }}
              stroke="lightgrey"
            />
            <ReferenceLine
              y={data && data.at(0)?.value}
              label={{
                position: "right",
                value: data.at(0)?.value.toFixed(1),
                fill: "#6495ed",
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
              tickFormatter={(number) => `${number.toFixed(2)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.3} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
        <ApiSnackbar
          snackbar={snackbar}
          setSnackbar={setSnackbar}
          api="binance"
        />
      </Paper>
    )
  );
};
