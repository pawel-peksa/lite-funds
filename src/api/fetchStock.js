import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";
import { calculatePerformance } from "../functions/calculatePerformance";

export const fetchStock = (
  stockSymbol,
  setData,
  setPerformance,
  setIsLoading,
  interval,
  setSnackbar,
  setMessage
) => {
  setIsLoading(true);
  let apiFunction;
  let cut;
  let tag;
  let valuePosition;
  switch (interval) {
    case "1M": {
      apiFunction = "TIME_SERIES_DAILY";
      cut = -76;
      tag = "Time Series (Daily)";
      valuePosition = 3;
      setMessage("1 Month performance: ");
      break;
    }
    case "3M": {
      apiFunction = "TIME_SERIES_DAILY";
      valuePosition = 3;
      cut = -34;
      tag = "Time Series (Daily)";
      setMessage("3 Months performance: ");
      break;
    }
    case "1Y": {
      valuePosition = 4;
      apiFunction = "TIME_SERIES_WEEKLY_ADJUSTED";
      cut = 54;
      tag = "Weekly Adjusted Time Series";
      setMessage("1 Year performance: ");
      break;
    }
    case "5Y": {
      apiFunction = "TIME_SERIES_WEEKLY_ADJUSTED";
      valuePosition = 4;
      cut = 265;
      tag = "Weekly Adjusted Time Series";
      setMessage("5 Years performance: ");
      break;
    }
    default: {
      apiFunction = "TIME_SERIES_MONTHLY_ADJUSTED";
      valuePosition = 4;
      tag = "Monthly Adjusted Time Series";
      cut = undefined;
      setMessage("All time performance: ");
      break;
    }
  }
  const apiCall = `${API}function=${apiFunction}&symbol=${stockSymbol}&apikey=${FIN_API_KEY}`;

  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data, setSnackbar);
      let series = data[tag];
      console.log("interval", interval);
      console.log(data);
      console.log(apiCall);
      if (series) {
        let entries = Object.entries(series);
        entries = entries.slice(0, cut);
        let toPlot = entries.map(([key, value]) => ({
          date: key,
          value: Number(Object.values(value)[valuePosition]),
        }));
        setData(toPlot);
        let performance = calculatePerformance(
          toPlot.at(-1).value,
          toPlot[0].value
        );
        setPerformance(performance);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log("error w fetch Crypto", error);
      setIsLoading(false);
    }); //TODO uporządkować error handling dla każdego zapytania
};
