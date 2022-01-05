import {
  FormControl,
  FormLabel,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import getSymbolFromCurrency from "currency-symbol-map";

export const TransactionStep3 = ({
  date,
  setDate,
  price,
  setPrice,
  qty,
  setQty,
  commission,
  setCommission,
  comment,
  setComment,
  currency,
  asset,
}) => {
  return (
    <>
      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">3. Date</FormLabel>
        <DatePicker
          inputFormat="dd/MM/yyyy"
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
        <FormLabel component="legend">4. Price and quantity</FormLabel>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            sx={{
              mt: 2,
              alignSelf: "center",
              maxWidth: 120,
            }}
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
            label="Price"
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0.01,
                step: 0.01,
              },
            }}
          />
          <TextField
            sx={{
              mt: 2,
              alignSelf: "center",
              maxWidth: 120,
              display: "inline-block",
            }}
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            label="Quantity"
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0,
                step: asset === "stocks" ? 1 : 0.1,
              },
            }}
          />
          <TextField
            sx={{ mt: 2, alignSelf: "center", maxWidth: 110 }}
            type="number"
            label="Commission"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            variant="outlined"
            InputProps={{
              inputProps: {
                min: 0,
                step: 0.1,
              },
            }}
          />
        </Box>
        {price > 0 && qty > 0 && (
          <Typography
            align="center"
            color="primary.main"
            sx={{ fontSize: 18, mt: 3 }}
          >
            {`Total: ${(price * qty + commission).toFixed(
              2
            )}${getSymbolFromCurrency(currency)}`}
          </Typography>
        )}
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">5. Comments</FormLabel>
        <TextField
          multiline
          rows="3"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            mt: 2,
            pr: 2,
          }}
          type="text"
          label="Add notes..."
          variant="outlined"
        />
      </FormControl>
    </>
  );
};
