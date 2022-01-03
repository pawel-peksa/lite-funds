import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";

export const SearchCurrency = ({
  text,
  setSymbol,
  list,
  setProduct,
  product,
  code,
  name,
  setCode,
}) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Autocomplete
        fullWidth
        value={value}
        sx={{ margin: "0 auto" }}
        onChange={(event, newValue) => {
          setValue(newValue);
          setSymbol(newValue?.[code]);
          setCode(
            newValue?.["symbol"]?.toUpperCase() ??
              newValue?.[code]?.toUpperCase()
          );
        }}
        options={list}
        getOptionLabel={(option) => {
          if (name === "id") {
            return option[name].toUpperCase();
          } else {
            return option[name];
          }
        }}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
    </>
  );
};
