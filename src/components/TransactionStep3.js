import { FormControl, FormLabel, Box, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect } from "react";

export const TransactionStep3 = ({ date, setDate, selected }) => {
  useEffect(() => {}, [date, selected]);
  return (
    <>
      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">4. Date</FormLabel>
        <DatePicker
          renderInput={(params) => (
            <TextField sx={{ mt: 2, alignSelf: "center" }} {...params} />
          )}
          label="Transaction Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          maxDate={new Date()}
        />
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">5. Price and quantity</FormLabel>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            sx={{
              mt: 2,
              alignSelf: "center",
              maxWidth: 120,
            }}
            type="number"
            min={0}
            label="Price"
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
          <TextField
            sx={{
              mt: 2,
              alignSelf: "center",
              maxWidth: 80,
              display: "inline-block",
            }}
            type="number"
            min={0}
            label="Qty"
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
          <TextField
            sx={{ mt: 2, alignSelf: "center", maxWidth: 110 }}
            type="number"
            min={0}
            label="Comission"
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Box>
      </FormControl>
    </>
  );
};
