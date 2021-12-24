import {
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useState } from "react";
import { SearchStock } from "../components/SearchStock";

export const Transaction = () => {
  const [value, setValue] = useState("female");
  const [checked, setChecked] = useState(true);
  const [today, setToday] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={12} md={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            gutterBottom
            color="primary.main"
            variant="h4"
            element="h2"
          >
            Add transaction
          </Typography>

          <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
            <FormLabel component="legend">1. Transaction</FormLabel>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="body1"
                color={!checked ? "primary.main" : ""}
              >
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
              <FormControlLabel
                value="stocks"
                control={<Radio />}
                label="Stocks"
              />
              <FormControlLabel
                value="cryptocurrency"
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

          <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
            <FormLabel component="legend">3. Name</FormLabel>
            <SearchStock />
          </FormControl>

          <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
            <FormLabel component="legend">4. Date</FormLabel>
            <DateTimePicker
              renderInput={(params) => (
                <TextField sx={{ mt: 2, alignSelf: "center" }} {...params} />
              )}
              ampm={false}
              label="Transaction time"
              value={today}
              onChange={(newValue) => {
                setToday(newValue);
              }}
              maxDateTime={new Date()}
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
        </Paper>
      </Grid>
    </Grid>
  );
};
