import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

export const SearchCurrency = ({ text, setSymbol, list }) => {
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
      options={list}
      size="small"
      getOptionLabel={(option) => option.code}
      renderInput={(params) => <TextField {...params} label={text} />}
    />
  );
};
