import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";
import { calculatePerformance } from "../functions/calculatePerformance";

export const fetchDailyAdjusted = (
  stockSymbol = "IBM",
  setData,
  setPerformance,
  setIsLoading,
  short = false,
  setSnackbar
) => {
  const apiFunction = "TIME_SERIES_DAILY_ADJUSTED";
  const apiCall = `${API}function=${apiFunction}&symbol=${stockSymbol}&apikey=${FIN_API_KEY}`;
  setIsLoading(true);
  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data, setSnackbar);
      let series = data["Time Series (Daily)"];
      if (series) {
        let entries = Object.entries(series);
        entries = short ? entries.slice(0, -76) : entries.slice(0, -34);
        let toPlot = entries.map(([key, value]) => ({
          date: key,
          value: Number(value["5. adjusted close"]),
        }));
        setIsLoading(false);
        setData(toPlot);
        let performance = calculatePerformance(
          toPlot.at(-1).value,
          toPlot[0].value
        );
        setPerformance(performance);
      }
    });
};
