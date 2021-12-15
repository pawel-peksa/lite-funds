import { API, FIN_API_KEY } from "../settings/api";

export const fetchStock = () => {
  const apiFunction = "TIME_SERIES_DAILY_ADJUSTED";
  const timeInterval = "60min";
  const stockSymbol = "MSFT";

  const apiCall = `${API}
  function=${apiFunction}
  &symbol=${stockSymbol}
  &interval=${timeInterval}
  outputsize=compact
  &apikey=${FIN_API_KEY}`;

  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => console.log(data));
};
