import { TextField, Autocomplete, Typography } from "@mui/material";
import { useState } from "react";
import { getCryptoValue } from "../api/cryptoApi2";
import getSymbolFromCurrency from "currency-symbol-map";

export const SearchCurrencyTransaction = ({
  text,
  setSymbol,
  list,
  setProduct,
  product,
  code,
  name,
}) => {
  const [value, setValue] = useState(null);
  const [price, setPrice] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSymbol(newValue?.[code]?.toUpperCase());
    setProduct(newValue?.[name]);
    getCryptoValue(newValue?.[name].toLowerCase(), "eur", setPrice);
  };
  return (
    <>
      <Autocomplete
        value={value}
        sx={{ margin: "0 auto", width: 280 }}
        onChange={handleChange}
        options={list}
        getOptionLabel={(option) => option[name]}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
      {value && (
        <>
          <Typography
            align="center"
            color="primary.main"
            sx={{ fontSize: 18, mt: 3 }}
          >
            {product}
          </Typography>
          <Typography align="center" variant="body1">
            Current price:{" "}
            <span style={{ color: "teal" }}>
              {price}
              {getSymbolFromCurrency("eur")}
            </span>
          </Typography>
        </>
      )}
    </>
  );
};
