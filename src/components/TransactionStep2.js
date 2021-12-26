import { FormControl, FormLabel } from "@mui/material";
import { SearchStock } from "./SearchStock";
import { SearchCurrency } from "./SearchCurrency";
import { quote } from "../api/currency";

export const TransactionStep2 = ({
  selected,
  setSelected,
  results,
  setResults,
  setCurrency,
  asset,
}) => {
  return (
    <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
      <FormLabel component="legend" sx={{ pb: 3 }}>
        3. Name
      </FormLabel>
      {asset === "stocks" ? (
        <SearchStock
          selected={selected}
          setSelected={setSelected}
          results={results}
          setResults={setResults}
          setCurrency={setCurrency}
        />
      ) : (
        <SearchCurrency
          text="Pick Cryptocurrency Symbol"
          setSymbol={setSelected}
          list={quote}
        />
      )}
    </FormControl>
  );
};
