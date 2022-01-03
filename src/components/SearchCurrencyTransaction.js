import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";

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

  return (
    <>
      <Autocomplete
        value={value}
        sx={{ margin: "0 auto", width: 280 }}
        onChange={(event, newValue) => {
          setValue(newValue);
          setSymbol((newValue?.[code]).toUpperCase());
          setProduct(newValue?.[name]);
        }}
        options={list}
        getOptionLabel={(option) => option[name]}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
      {/* {value && (
        <Typography
          align="center"
          color="primary.main"
          sx={{ fontSize: 18, mt: 3 }}
        >
          [{value.code}] - {product}
        </Typography>
      )} */}
    </>
  );
};
