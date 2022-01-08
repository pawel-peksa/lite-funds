import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
// import { getCryptoHistory } from "../api/cryptoApi2";
import { yFinanceFetchStock } from "../api/yFinance";
import { parseISO, format, differenceInCalendarDays, addDays } from "date-fns";

export const ChartOverTime = ({ stocks, crypto }) => {
  const [interval, setInterval] = useState("3M");
  const [plot, setPlot] = useState("value");
  // const [isLoading, setIsLoading] = useState(false);
  // const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [data, setData] = useState([]);

  //prepare stock data to plot
  useEffect(() => {
    let stockToAppend;
    stocks.forEach(async (stock) => {
      stockToAppend = await yFinanceFetchStock(
        stock.symbol,
        undefined,
        undefined,
        undefined,
        interval,
        undefined,
        undefined,
        true
      );
      //create an array with all days between fetched range
      let allDays = [];
      let start = stockToAppend.at(-1).date;
      let end = stockToAppend[0].date;
      let days = differenceInCalendarDays(parseISO(end), parseISO(start));

      for (let i = 0; i <= days; i++) {
        let date = format(addDays(parseISO(start), i), "yyyy-MM-dd");
        let value = stockToAppend.find((day) => day.date === date);
        let day = {
          date,
          value: value?.value,
        };
        allDays.push(day);
      }

      let newObj = {
        name: stock.name,
        fetched: stockToAppend,
        allDays,
      };
      setStockData((prev) => [...prev, newObj]);
    });
  }, [stocks, interval]);

  useEffect(() => {
    if (stockData.length > 0 && stockData.length === stocks.length) {
      console.log(stockData);
      let sum = [];

      stockData[0].allDays.forEach((day) => {
        let pricesArray = stockData.map((stock) => {
          let dayOfInterest = stock.allDays.find(
            (obj) => obj.date === day.date
          );
          return dayOfInterest.value;
        });
        let valueSum = pricesArray.reduce((a, b) => a + b);
        let daySum = {
          date: day.date,
          value: isNaN(valueSum) ? null : valueSum,
        };
        sum.push(daySum);
      });
      console.log(sum);
      setData(sum);
    }
  }, [stockData, stocks]);

  const handlePlotValue = async () => {
    setPlot("value");
  };

  const handlePlotProfit = () => {
    setPlot("profit");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          pb: 2,
        }}
      >
        <Box sx={{ zIndex: 100, position: "absolute", right: 0, top: 1 }}>
          <Button
            color={interval === "3M" ? "primary" : "secondary"}
            onClick={() => setInterval(() => "3M")}
            sx={{ minWidth: "40px" }}
          >
            3M
          </Button>
          <Button
            color={interval === "1Y" ? "primary" : "secondary"}
            onClick={() => setInterval(() => "1Y")}
            sx={{ minWidth: "40px" }}
          >
            1Y
          </Button>
          <Button
            color={interval === "5Y" ? "primary" : "secondary"}
            onClick={() => setInterval(() => "5Y")}
            sx={{ minWidth: "40px" }}
          >
            5Y
          </Button>
          <Button
            color={interval === "ALL" ? "primary" : "secondary"}
            onClick={() => setInterval(() => "ALL")}
            sx={{ minWidth: "40px" }}
          >
            All
          </Button>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height="82%" margin={{ top: 5 }}>
        <LineChart
          width={500}
          height={250}
          data={data}
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
            tickFormatter={(number) => `${number.toFixed(2)}`}
          />
          <Tooltip />
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
          color={plot === "value" ? "primary" : "secondary"}
          onClick={handlePlotValue}
          sx={{ minWidth: "40px" }}
        >
          value over time
        </Button>
        <Button
          color={plot === "profit" ? "primary" : "secondary"}
          onClick={handlePlotProfit}
          sx={{ minWidth: "40px" }}
        >
          profit over time
        </Button>
      </Box>
    </>
  );
};
