import { API, FIN_API_KEY } from "../settings/api";

export const fetchDailyAdjusted = (stockSymbol = "IBM", setData) => {
  const apiFunction = "TIME_SERIES_DAILY_ADJUSTED";
  const apiCall = `${API}function=${apiFunction}&symbol=${stockSymbol}&outputsize=compact&apikey=${FIN_API_KEY}`;

  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      let series = data["Time Series (Daily)"];
      if (series) {
        let entries = Object.entries(series);
        let toPlot = entries.map(([key, value]) => ({
          date: key,
          value: Number(value["5. adjusted close"]),
        }));
        console.log(toPlot);
        setData(toPlot);
      }
    });
};
