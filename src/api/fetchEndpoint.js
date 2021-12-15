import { API, FIN_API_KEY } from "../settings/api";

export const fetchEndpoint = (ticker, setPrice, setChange, setIsLoading) => {
  const apiCall = `${API}function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${FIN_API_KEY}`;
  setIsLoading(true);

  setPrice("1234.0000");
  setChange("1.154%");
  setIsLoading(false);

  // fetch(apiCall)
  //   .then((data) => data.json())
  //   .then((data) => {
  //     let endpoint = data["Global Quote"];
  //     setPrice(endpoint["05. price"]);
  //     setChange(endpoint["10. change percent"]);
  //     setIsLoading(false);
  //   })
  //   .catch((error) => {
  //     alert(error);
  //     setIsLoading(false);
  //   });
};
