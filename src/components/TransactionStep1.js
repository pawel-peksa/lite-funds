import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const TransactionStep1 = ({ handleChange, value }) => {
  return (
    <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
      <FormLabel component="legend">1. Select type of asset</FormLabel>
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
        {/* 
        FUTURE IMPROVEMENT
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
        /> */}
      </RadioGroup>
    </FormControl>
  );
};
