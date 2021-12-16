import { API, FIN_API_KEY } from "../settings/api";
import { checkNote } from "./checkNote";

export const searchEndpoint = (keyword, setResults, setIsLoading) => {
  setIsLoading(true);
  const apiCall = `${API}function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${FIN_API_KEY}`;

  fetch(apiCall)
    .then((data) => data.json())
    .then((data) => {
      checkNote(data);
      let results = data["bestMatches"];
      setResults(results);
      setIsLoading(false);
    })
    .catch((error) => {
      alert(error);
      setIsLoading(false);
    });
};
