import { Grid, Typography, TextField } from "@mui/material";
import { SearchCurrency } from "./SearchCurrency";
import { useState } from "react";
import { fetchExchangeRates } from "../api/fetchExchangeRates";
import { ApiSnackbar } from "./ApiSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";

export const CalculateCurrency = ({ setFrom, from, setTo, to }) => {
  const [formValue, setFormValue] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState(1);
  const [snackbar, setSnackbar] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value > 0) setFormValue(e.target.value);
  };

  const handleCalculate = () => {
    fetchExchangeRates(
      from,
      to,
      setIsLoading,
      setSnackbar,
      setCalculatedValue,
      formValue
    );
  };

  return (
    <Grid
      container
      maxWidth="sm"
      sx={{ justifyContent: "center", mt: 3 }}
      rowSpacing={1}
    >
      <Grid
        container
        item
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid
          item
          container
          rowSpacing={1}
          md={6}
          xs={12}
          sx={{
            flexDirection: "column",
          }}
        >
          <Grid item>
            <SearchCurrency text="From" setSymbol={setFrom} />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
                minWidth: 48,
              }}
              color="white"
            >
              {from}
            </Typography>

            <TextField
              sx={{ ml: -1 }}
              value={formValue}
              onChange={handleChange}
              InputProps={{
                inputProps: {
                  style: { textAlign: "center" },
                },
              }}
              type="number"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          rowSpacing={1}
          md={6}
          xs={12}
          sx={{ flexDirection: "column" }}
        >
          <Grid item>
            <SearchCurrency text="To" setSymbol={setTo} />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
                minWidth: 48, //TODO wyrzucić do nowego komponentu lub ujednolicić style
              }}
              color="white"
            >
              {to}
            </Typography>
            <TextField
              InputProps={{
                inputProps: {
                  style: {
                    textAlign: "center",
                    marginRight: "30px",
                    cursor: "default",
                  },
                },
              }}
              // disabled
              value={calculatedValue}
              sx={{ ml: -1 }}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={6} xs={12}>
          <LoadingButton
            disabled={!!from & !!to ? false : true}
            fullWidth
            onClick={handleCalculate}
            loading={loading}
            variant="contained"
          >
            Calculate
          </LoadingButton>
        </Grid>
        <Grid item md={6} xs={12}>
          <LoadingButton
            disabled={!!from & !!to ? false : true}
            fullWidth
            // onClick={handleCalculate}
            // loading={loading}
            variant="contained"
          >
            Plot
          </LoadingButton>
        </Grid>
      </Grid>
      <ApiSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Grid>
  );
};
