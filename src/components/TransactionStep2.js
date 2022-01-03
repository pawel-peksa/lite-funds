import { FormControl, FormLabel } from "@mui/material";
import { SearchStock } from "./SearchStock";
import { SearchCurrencyTransaction } from "./SearchCurrencyTransaction";
import { cryptoList } from "../api/cryptoList";

export const TransactionStep2 = ({
  symbol,
  setSymbol,
  results,
  setResults,
  setCurrency,
  asset,
  setProduct,
  product,
}) => {
  return (
    <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
      <FormLabel component="legend" sx={{ pb: 3 }}>
        3. Name
      </FormLabel>
      {asset === "stocks" ? (
        <SearchStock
          symbol={symbol}
          setSymbol={setSymbol}
          results={results}
          setResults={setResults}
          setCurrency={setCurrency}
          setProduct={setProduct}
        />
      ) : (
        <SearchCurrencyTransaction
          text="Search Cryptocurrency"
          setSymbol={setSymbol}
          list={cryptoList}
          code="symbol"
          name="name"
          setProduct={setProduct}
          product={product}
        />
      )}
    </FormControl>
  );
};
