import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { parseISO, format } from "date-fns";
import { stockOverTime } from "../functions/stockOverTime";
import { cryptoOverTime } from "../functions/cryptoOverTime";

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
          {payload && payload[0].value.toFixed(2)}
          {payload && getSymbolFromCurrency("eur")}
        </Typography>
      </Paper>
    );
  }
  return null;
};

export const ChartOverTime = ({ stocks, crypto }) => {
  const [interval, setInterval] = useState("3M"); //for future improvement -> plot difference time periods on value over time chart
  const [plot, setPlot] = useState("all assets");
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    //get stock prices data to plot
    stockOverTime(stocks, interval, setStockData);
    //get crypto prices data to plot
    cryptoOverTime(crypto, interval, setCryptoData);
  }, [crypto, stocks, interval]);

  useEffect(() => {
    // check if all history data fetched

    let all = [];
    let cryptoSum = [];
    let stockSum = [];

    // check if all history data fetched
    if (
      stockData.length > 0 &&
      stockData.length === stocks.length &&
      cryptoData.length > 0 &&
      cryptoData.length === crypto.length
    ) {
      if (typeof stockData[0].allDaysNoVoids !== "undefined") {
        stockData[0].allDaysNoVoids.forEach((day) => {
          //get array of stock prices for each day
          let stockPricesArray = stockData.map((stock) => {
            let dayOfInterest = stock.allDaysNoVoids.find(
              (obj) => obj.date === day.date
            );
            return dayOfInterest.value;
          });
          let stockValueSum = stockPricesArray.reduce((a, b) => a + b) ?? 0;
          let stockDaySum = {
            date: day.date,
            value: stockValueSum,
          };

          //get array of crypto prices for each day
          let cryptoPricesArray = cryptoData.map((crypto) => {
            let dayOfInterest = crypto.allDays.find(
              (obj) => obj.date === day.date
            );
            return dayOfInterest.value;
          });
          let cryptoValueSum = cryptoPricesArray.reduce((a, b) => a + b) ?? 0;
          let cryptoDaySum = {
            date: day.date,
            value: isNaN(cryptoValueSum) ? 0 : cryptoValueSum,
          };

          cryptoSum.push(cryptoDaySum);
          stockSum.push(stockDaySum);
        });
      }

      all = Object.values(
        [...cryptoSum, ...stockSum].reduce((a, { date, value }) => {
          a[date] = a[date] || { date, value: 0 };
          a[date].value = a[date].value + value;
          return a;
        }, {})
      );
    } else if (stockData.length > 0 && stockData.length === stocks.length) {
      if (typeof stockData[0].allDaysNoVoids !== "undefined") {
        stockData[0].allDaysNoVoids.forEach((day) => {
          //get array of stock prices for each day
          let stockPricesArray = stockData.map((stock) => {
            let dayOfInterest = stock.allDaysNoVoids.find(
              (obj) => obj.date === day.date
            );
            return dayOfInterest.value;
          });
          let stockValueSum = stockPricesArray.reduce((a, b) => a + b) ?? 0;
          let stockDaySum = {
            date: day.date,
            value: stockValueSum,
          };
          let cryptoDaySum = {
            date: day.date,
            value: 0,
          };
          stockSum.push(stockDaySum);
          cryptoSum.push(cryptoDaySum);
        });
      }
      //sum-up multiple transaction in the same days into one pair of value and date
      all = Object.values(
        [...stockSum].reduce((a, { date, value }) => {
          a[date] = a[date] || { date, value: 0 };
          a[date].value = a[date].value + value;
          return a;
        }, {})
      );
    } else if (cryptoData.length > 0 && cryptoData.length === crypto.length) {
      if (typeof cryptoData[0].allDays !== "undefined") {
        cryptoData[0].allDays.forEach((day) => {
          //get array of crypto prices for each day
          let cryptoPricesArray = cryptoData.map((crypto) => {
            let dayOfInterest = crypto.allDays.find(
              (obj) => obj.date === day.date
            );
            return dayOfInterest.value;
          });
          let cryptoValueSum = cryptoPricesArray.reduce((a, b) => a + b);
          let cryptoDaySum = {
            date: day.date,
            value: cryptoValueSum,
          };
          let stockDaySum = {
            date: day.date,
            value: 0,
          };
          cryptoSum.push(cryptoDaySum);
          stockSum.push(stockDaySum);
        });
      }
      //sum-up multiple transaction in the same days into one pair of value and date
      all = Object.values(
        [...cryptoSum].reduce((a, { date, value }) => {
          a[date] = a[date] || { date, value: 0 };
          a[date].value = a[date].value + value;
          return a;
        }, {})
      );
    }

    if (plot === "all assets") setData(() => [...all]);
    else if (plot === "cryptocurrency") setData(() => [...cryptoSum]);
    else if (plot === "stocks") setData(() => [...stockSum]);
  }, [stockData, cryptoData, stocks, crypto, plot]);

  const handlePlotAllAssets = async () => {
    setPlot("all assets");
  };

  const handlePlotCryptocurrency = () => {
    setPlot("cryptocurrency");
  };
  const handlePlotStocks = () => {
    setPlot("stocks");
  };

  return (
    <>
      <Typography
        variant="h5"
        component="p"
        color="secondary"
        align="center"
        sx={{ fontSize: 16, mb: -2, mt: 1 }}
      >
        last quarter balance
      </Typography>

      <ResponsiveContainer width="100%" height="82%" margin={{ top: 5 }}>
        <LineChart
          width={500}
          height={250}
          data={[...data]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            angle={-30}
            dx={-5}
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
            dataKey="value"
            type="number"
            domain={[
              // (dataMin) => dataMin - dataMin / 10,
              "auto",
              "auto",
              // (dataMax) => dataMax + dataMax / 10,
            ]}
            tickCount={8}
            tickFormatter={(number) =>
              `${getSymbolFromCurrency("eur")}${number}`
            }
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Line
            connectNulls
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button
          color={plot === "all assets" ? "primary" : "secondary"}
          onClick={handlePlotAllAssets}
          sx={{ minWidth: "40px" }}
        >
          all assets
        </Button>
        <Button
          color={plot === "cryptocurrency" ? "primary" : "secondary"}
          onClick={handlePlotCryptocurrency}
          sx={{ minWidth: "40px" }}
        >
          cryptocurrency
        </Button>
        <Button
          color={plot === "stocks" ? "primary" : "secondary"}
          onClick={handlePlotStocks}
          sx={{ minWidth: "40px" }}
        >
          stocks
        </Button>
      </Box>
    </>
  );
};
