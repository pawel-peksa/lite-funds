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
  setShowCurrency,
  setFetchingStockInfo,
  setCurrency
) => {
  if (setFetchingStockInfo) {
    setFetchingStockInfo(true);
  }
  const result = await yahooFinance.quote(symbol);
  setShowCurrency(result.currency);
  setCurrency(result.currency);
  setCurrentValue(result.regularMarketPrice);
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
