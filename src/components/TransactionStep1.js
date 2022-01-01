import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Stack,
} from "@mui/material";

export const TransactionStep1 = ({
  handleChange,
  handleSwitch,
  value,
  checked,
}) => {
  return (
    <>
      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">1. Transaction</FormLabel>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1" color={!checked ? "primary.main" : ""}>
            Sell
          </Typography>
          <Switch
            checked={checked}
            color="default"
            onChange={handleSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography variant="body1" color={checked ? "primary.main" : ""}>
            Buy
          </Typography>
        </Stack>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
        <FormLabel component="legend">2. Asset</FormLabel>
        <RadioGroup
          row
          aria-label="asset type"
          name="asset-type"
          value={value}
          onChange={handleChange}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel value="stocks" control={<Radio />} label="Stocks" />
          <FormControlLabel
            value="crypto"
            control={<Radio />}
            label="Cryptocurrency"
          />
          <FormControlLabel
            value="bonds"
            control={<Radio />}
            label="Bonds"
            disabled
          />
          <FormControlLabel
            value="gold"
            control={<Radio />}
            label="Gold"
            disabled
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
