import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";
import { calculatePerformance } from "../functions/calculatePerformance";

export const fetchWeeklyAdjusted = (
  stockSymbol,
  setData,
  setPerformance,
  setIsLoading,
  short
) => {
  const apiFunction = "TIME_SERIES_WEEKLY_ADJUSTED";
  const apiCall = `${API}function=${apiFunction}&symbol=${stockSymbol}&apikey=${FIN_API_KEY}`;
  setIsLoading(true);
  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data);
      let series = data["Weekly Adjusted Time Series"];
      if (series) {
        let entries = Object.entries(series);
        entries = short ? entries.slice(0, 54) : entries.slice(0, 262);
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
