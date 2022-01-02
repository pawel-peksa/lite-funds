import { Typography, Box } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";

export const Status = ({ balance, profitLoss }) => {
  let showBalance = 0;
  if (balance) {
    showBalance = balance.toFixed(2) + getSymbolFromCurrency("EUR");
  }
  let showProfitLoss = 0;
  let percents = 0;
  if (profitLoss) {
    showProfitLoss = profitLoss.toFixed(2) + getSymbolFromCurrency("EUR");
    percents = ((balance / (balance - profitLoss) - 1) * 100).toFixed(2) + "%";
  }

  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        color="primary.main"
        align="center"
        gutterBottom
      >
        {showBalance}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        color="primary.main"
        align="center"
        gutterBottom
      >
        {showProfitLoss} {percents}
      </Typography>
    </Box>
  );
};
