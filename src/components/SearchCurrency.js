import { TextField, Autocomplete, Typography } from "@mui/material";
import { useState } from "react";
import { cryptoSymbol } from "crypto-symbol";

export const SearchCurrency = ({
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
        // fullWidth
        value={value}
        sx={{ width: 400, margin: "0 auto" }}
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
