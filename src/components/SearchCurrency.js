import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";

export const SearchCurrency = ({
  text,
  setSymbol,
  list,
  setProduct,
  product,
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
          setSymbol(newValue?.code);
        }}
        options={list}
        getOptionLabel={(option) => option.code}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
    </>
  );
};
