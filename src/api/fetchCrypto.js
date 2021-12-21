import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";
import { calculatePerformance } from "../functions/calculatePerformance";

export const fetchCrypto = (
  from,
  to,
  setLoading,
  setData,
  setPerformance,
  interval,
  setSnackbar,
  setMessage
) => {
  setLoading(true);

  let timeSeries;
  let cut;
  let tag;
  switch (interval) {
    case "1M": {
      timeSeries = "DAILY";
      cut = -76;
      tag = "Time Series (Digital Currency Daily)";
      setMessage("1 Month performance: ");
      break;
    }
    case "3M": {
      timeSeries = "DAILY";
      cut = -34;
      tag = "Time Series (Digital Currency Daily)";
      setMessage("3 Months performance: ");
      break;
    }
    case "1Y": {
      timeSeries = "WEEKLY";
      cut = 54;
      tag = "Time Series (Digital Currency Weekly)";
      setMessage("1 Year performance: ");
      break;
    }
    case "5Y": {
      timeSeries = "WEEKLY";
      tag = "Time Series (Digital Currency Weekly)";
      cut = 262;
      setMessage("5 Years performance: ");
      break;
    }
    default: {
      timeSeries = "MONTHLY";
      cut = undefined;
      tag = "Time Series (Digital Currency Monthly)";
      setMessage("All time performance: ");
      break;
    }
  }
  const apiCall = `${API}function=DIGITAL_CURRENCY_${timeSeries}&symbol=${from}&market=${to}&apikey=${FIN_API_KEY}`;

  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data, setSnackbar);
      let series = data[tag];
      console.log("interval", interval);
      console.log(data);
      if (series) {
        let entries = Object.entries(series);
        entries = entries.slice(0, cut);
        let toPlot = entries.map(([key, value]) => ({
          date: key,
          value: Number(Object.values(value)[6]),
        }));
        setData(toPlot);
        let performance = calculatePerformance(
          toPlot.at(-1).value,
          toPlot[0].value
        );
        setPerformance(performance);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log("error w fetch Crypto", error);
      setLoading(false);
    }); //TODO uporządkować error handling dla każdego zapytania
};
