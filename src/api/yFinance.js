import yahooFinance from "yahoo-finance2";
import { calculatePerformance } from "../functions/calculatePerformance";
const { subDays, format } = require("date-fns");

export const yFinanceFetchStock = async (
  stockSymbol,
  setData,
  setPerformance,
  setIsLoading,
  interval,
  setSnackbar,
  setMessage
) => {
  setIsLoading(true);

  let today = new Date();
  let queryOptions = { period1: "2021-02-01", interval: "1d" };

  console.log("today", format(today, "yyyy-MM-dd"));

  switch (interval) {
    case "1M": {
      queryOptions = { period1: subDays(today, 30), interval: "1d" };
      setMessage("1M change: ");
      break;
    }
    case "3M": {
      queryOptions = { period1: subDays(today, 90), interval: "1d" };
      setMessage("3M change: ");
      break;
    }
    case "1Y": {
      queryOptions = { period1: subDays(today, 365), interval: "1wk" };
      setMessage("1Y change: ");
      break;
    }
    case "5Y": {
      queryOptions = { period1: subDays(today, 1826), interval: "1mo" };
      setMessage("5Y change: ");
      break;
    }
    default: {
      queryOptions = { period1: subDays(today, 20000), interval: "1mo" };
      setMessage("All time change: ");
      break;
    }
  }

  const result = await yahooFinance.historical(stockSymbol, queryOptions);
  console.log(result);
  let toPlot = result.map((obj) => {
    return {
      date: format(obj.date, "yyyy-MM-dd"),
      value: obj.adjClose,
    };
  });
  toPlot = toPlot.reverse();
  setData(toPlot);
  let performance = calculatePerformance(toPlot.at(-1).value, toPlot[0].value);
  setPerformance(performance);
  setIsLoading(false);
};

export const yFinanceQuote = async (
  symbol,
  setCurrentValue,
  setCurrentVolume,
  setCurrency
) => {
  const result = await yahooFinance.quote(symbol);
  setCurrency(result.currency);
  setCurrentValue(result.regularMarketPrice);
  setCurrentVolume(result.regularMarketVolume);
};

export const yFinanceSearchEndpoint = async (
  search,
  setResults,
  setIsLoading
) => {
  if (search === "") return;
  setIsLoading(true);
  const result = await yahooFinance.search(search /* queryOptions */);

  console.log(result.quotes);
  setResults(result.quotes);
  setIsLoading(false);
};