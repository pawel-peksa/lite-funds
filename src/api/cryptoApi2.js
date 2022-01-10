import CoinGecko from "coingecko-api";
import { format } from "date-fns";
import { calculatePerformance } from "../functions/calculatePerformance";

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

export const getCryptoValue = async (symbol, currency, setPrice) => {
  if (typeof symbol === "undefined") return;
  let data = await CoinGeckoClient.simple.price({
    ids: symbol,
    vs_currencies: currency,
  });
  let resp = data.data;
  let cur;
  let price;
  if (currency && symbol) {
    cur = currency.toLowerCase();
    price = resp?.[symbol]?.[cur];
  }
  if (typeof setPrice === "function") {
    setPrice(price);
  }
  return price;
};

export const calcCryptoPairRate = async (
  from,
  to,
  setIsLoading,
  setSnackbar,
  setCalculatedValue,
  formValue
) => {
  setSnackbar(false);
  setIsLoading(true);
  try {
    let rate = await getCryptoValue(from, to);
    setCalculatedValue((formValue * rate).toFixed(2));
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setSnackbar(true);
  }
};

export const getCryptoHistory = async (
  from,
  to,
  interval,
  setData,
  setPerformance,
  setSnackbar,
  setMessage,
  append = false
) => {
  let limit;
  switch (interval) {
    case "1M": {
      limit = "31";
      if (typeof setMessage === "function") setMessage("1M change: ");
      break;
    }
    case "3M": {
      limit = "92";
      if (typeof setMessage === "function") setMessage("3M change: ");
      break;
    }
    case "1Y": {
      limit = "365";
      if (typeof setMessage === "function") setMessage("1Y change: ");
      break;
    }
    default: {
      limit = "max";
      if (typeof setMessage === "function") setMessage("All time change: ");
      break;
    }
  }

  if (typeof setSnackbar === "function") setSnackbar(false);
  try {
    let data = await CoinGeckoClient.coins.fetchMarketChart(from, {
      days: limit,
      vs_currency: to,
    });

    let plotData = data.data.prices.map((pair) => {
      return {
        date: format(new Date(pair[0]), "yyyy-MM-dd"),
        value: pair[1],
      };
    });

    let performance = calculatePerformance(
      plotData[0].value,
      plotData.at(-1).value
    );
    if (typeof setPerformance === "function") setPerformance(performance);
    if (append) {
      return plotData.reverse();
    } else {
      setData(plotData.reverse());
    }
  } catch (error) {
    console.log(error);
    if (typeof setSnackbar === "function") setSnackbar(true);
  }
};
