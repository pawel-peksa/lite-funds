import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { currency } from "../api/currency";
import { useState } from "react";

export const SearchCurrency = ({ text, setSymbol }) => {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      fullWidth
      disablePortal
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setSymbol(newValue?.code);
      }}
      options={currency}
      size="small"
      getOptionLabel={(option) => option.search}
      renderInput={(params) => <TextField {...params} label={text} />}
    />
  );
};
