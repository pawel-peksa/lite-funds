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
  setMessage,
  append = false
) => {
  if (typeof setIsLoading === "function") setIsLoading(true);

  let today = new Date();
  let queryOptions = { period1: "2021-02-01", interval: "1d" };

  switch (interval) {
    case "1M": {
      queryOptions = { period1: subDays(today, 30), interval: "1d" };
      if (typeof setMessage === "function") setMessage("1M change: ");
      break;
    }
    case "3M": {
      queryOptions = { period1: subDays(today, 90), interval: "1d" };
      if (typeof setMessage === "function") setMessage("3M change: ");
      break;
    }
    case "1Y": {
      queryOptions = { period1: subDays(today, 365), interval: "1wk" };
      if (typeof setMessage === "function") setMessage("1Y change: ");
      break;
    }
    case "5Y": {
      queryOptions = { period1: subDays(today, 1826), interval: "1mo" };
      if (typeof setMessage === "function") setMessage("5Y change: ");
      break;
    }
    default: {
      queryOptions = { period1: subDays(today, 20000), interval: "1mo" };
      if (typeof setMessage === "function") setMessage("All time change: ");
      break;
    }
  }

  const result = await yahooFinance.historical(stockSymbol, queryOptions);
  let toPlot = result.map((obj) => {
    return {
      date: format(obj.date, "yyyy-MM-dd"),
      value: obj.adjClose,
    };
  });
  toPlot = toPlot.reverse();

  let performance = calculatePerformance(toPlot.at(-1).value, toPlot[0].value);
  if (typeof setPerformance === "function") setPerformance(performance);
  if (typeof setIsLoading === "function") setIsLoading(false);
  if (append) {
    return toPlot;
  } else {
    setData(toPlot);
  }
};

export const yFinanceQuote = async (
  symbol,
  setCurrentValue,
  setCurrentVolume,
  setShowCurrency,
  setFetchingStockInfo,
  setCurrency
) => {
  if (setFetchingStockInfo) {
    setFetchingStockInfo(true);
  }
  const result = await yahooFinance.quote(symbol);
  if (typeof setShowCurrency === "function") setShowCurrency(result.currency);
  if (typeof setCurrency === "function") setCurrency(result.currency);
  if (typeof setCurrentValue === "function")
    setCurrentValue(result.regularMarketPrice);
  if (typeof setCurrentVolume === "function")
    setCurrentVolume(result.regularMarketVolume);
  if (setFetchingStockInfo) {
    setFetchingStockInfo(false);
  }
};

export const yFinanceSearchEndpoint = async (
  search,
  setResults,
  setIsLoading
) => {
  if (search === "") return;
  setIsLoading(true);
  const result = await yahooFinance.search(search /* queryOptions */);

  setResults(result.quotes);
  setIsLoading(false);
};
