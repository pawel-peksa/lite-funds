import CoinGecko from "coingecko-api";
import { format } from "date-fns";
import { calculatePerformance } from "../functions/calculatePerformance";

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

export const getCryptoValue = async (symbol, currency) => {
  let data = await CoinGeckoClient.simple.price({
    ids: symbol,
    vs_currencies: currency,
  });
  let resp = data.data;

  let cur = currency.toLowerCase();
  let price = resp[symbol][cur];
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
  setMessage
) => {
  let limit;
  switch (interval) {
    case "1M": {
      limit = "31";
      setMessage("1 Month performance: ");
      break;
    }
    case "3M": {
      limit = "92";
      setMessage("3 Months performance: ");
      break;
    }
    case "1Y": {
      limit = "365";
      setMessage("1 Year performance: ");
      break;
    }
    default: {
      limit = "max";
      setMessage("All time performance: ");
      break;
    }
  }

  setSnackbar(false);
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
    setData(plotData.reverse());

    let performance = calculatePerformance(
      plotData.at(-1).value,
      plotData[0].value
    );
    setPerformance(performance);
  } catch (error) {
    console.log(error);
    setSnackbar(true);
  }
};
