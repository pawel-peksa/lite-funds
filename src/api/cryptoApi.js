import Binance from "binance-api-node";
import { format } from "date-fns";
import { calculatePerformance } from "../functions/calculatePerformance";

const client = Binance();

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
    const resp = await client.avgPrice({ symbol: from + to });
    setCalculatedValue((formValue * Number(resp.price)).toFixed(2));
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setSnackbar(true);
  }
};

export const getCryptoHistory = async (
  pair,
  interval,
  setLoading,
  setData,
  setPerformance,
  setSnackbar,
  setMessage
) => {
  let sampling;
  let limit;
  switch (interval) {
    case "1M": {
      sampling = "1d";
      limit = 31;
      setMessage("1 Month performance: ");
      break;
    }
    case "3M": {
      sampling = "1d";
      limit = 92;
      setMessage("3 Months performance: ");
      break;
    }
    case "1Y": {
      sampling = "3d";
      limit = 120;
      setMessage("1 Year performance: ");
      break;
    }
    default: {
      sampling = "3d";
      limit = 1000;
      setMessage("All time performance: ");
      break;
    }
  }
  setSnackbar(false);
  setLoading(true);
  try {
    const candlestickData = await client.candles({
      symbol: pair,
      interval: sampling,
      limit: limit,
    });
    let data = candlestickData.map((sample) => {
      return {
        date: format(new Date(sample.closeTime), "yyyy-MM-dd"),
        value: Number(sample.close),
      };
    });
    setData(data.reverse());

    let performance = calculatePerformance(data.at(-1).value, data[0].value);
    setPerformance(performance);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    setSnackbar(true);
  }
};
