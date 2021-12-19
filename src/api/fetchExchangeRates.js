import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";

export const fetchExchangeRates = (
  from,
  to,
  setIsLoading,
  setSnackbar,
  setCalculatedValue,
  formValue
) => {
  const apiFunction = "CURRENCY_EXCHANGE_RATE";
  const apiCall = `${API}function=${apiFunction}&from_currency=${from}&to_currency=${to}&apikey=${FIN_API_KEY}`;
  setIsLoading(true);
  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data, setSnackbar);
      let rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      setCalculatedValue((formValue * Number(rate)).toFixed(2));
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("error w fetch exchange rate", error);
      console.log(apiCall);
      setIsLoading(false);
    });
};
