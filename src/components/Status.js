import { Typography, Box } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import NumberFormat from "react-number-format";

export const Status = ({ balance, profitLoss }) => {
  let showBalance = 0;
  if (balance) {
    showBalance = balance.toFixed(2) + getSymbolFromCurrency("EUR");
  }
  let showProfitLoss = 0;
  let percents = 0;
  if (profitLoss) {
    showProfitLoss = Number(profitLoss.toFixed(2));
    percents = ((balance / (balance - profitLoss) - 1) * 100).toFixed(2) + "%";
  }

  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        color="primary.main"
        align="center"
        sx={{ fontSize: 30, mt: 3 }}
      >
        <NumberFormat
          thousandSeparator={true}
          value={showBalance}
          displayType={"text"}
          prefix={getSymbolFromCurrency("EUR")}
        />
      </Typography>
      <Typography
        sx={{ fontSize: 16, mt: -1 }}
        variant="h5"
        component="p"
        color="secondary.main"
        align="center"
        gutterBottom
      >
        balance
      </Typography>
      <Typography
        variant="h4"
        component="h3"
        color="primary.main"
        align="center"
        sx={{ fontSize: 22, mt: 3 }}
      >
        <span style={{ color: showProfitLoss > 0 ? "teal" : "red" }}>
          {showProfitLoss > 0 ? "+" : "-"}
          {showProfitLoss + getSymbolFromCurrency("EUR")}{" "}
          <span style={{ fontSize: 16 }}>({percents})</span>
        </span>
      </Typography>
      <Typography
        sx={{ fontSize: 16 }}
        variant="h5"
        component="p"
        color="secondary.main"
        align="center"
        gutterBottom
      >
        total profit/loss
      </Typography>
    </Box>
  );
};
