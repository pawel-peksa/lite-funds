import { TextField, Autocomplete, Typography } from "@mui/material";
import { useState } from "react";
import { cryptoSymbol } from "crypto-symbol";

export const SearchCurrencyTransaction = ({
  text,
  setSymbol,
  list,
  setProduct,
  product,
}) => {
  const [value, setValue] = useState(null);
  const { nameLookup } = cryptoSymbol({});

  return (
    <>
      <Autocomplete
        value={value}
        sx={{ margin: "0 auto", width: 280 }}
        onChange={(event, newValue) => {
          setValue(newValue);
          setSymbol(newValue?.code);
          if (newValue) {
            setProduct(nameLookup(newValue.code));
          }
        }}
        options={list}
        getOptionLabel={(option) => option.code}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
      {value && (
        <Typography
          align="center"
          color="primary.main"
          sx={{ fontSize: 18, mt: 3 }}
        >
          [{value.code}] - {product}
        </Typography>
      )}
    </>
  );
};
