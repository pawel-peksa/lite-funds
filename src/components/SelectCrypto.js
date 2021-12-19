import { Paper, Typography } from "@mui/material";
import { CalculateCurrency } from "./CalculateCurrency";

export const SelectCrypto = ({ setFrom, from, setTo, to }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" component="div" color="primary.main">
        Select currency pair:
      </Typography>
      <CalculateCurrency setFrom={setFrom} from={from} setTo={setTo} to={to} />
    </Paper>
  );
};
