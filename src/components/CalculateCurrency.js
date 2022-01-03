import { Grid, Typography, TextField, Button } from "@mui/material";
import { SearchCurrency } from "./SearchCurrency";
import { useState, useEffect } from "react";
import { ApiSnackbar } from "./ApiSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import { calcCryptoPairRate } from "../api/cryptoApi2";
import { currencyList } from "../api/currencyList";
import { cryptoList } from "../api/cryptoList";

export const CalculateCurrency = ({
  setFrom,
  from,
  setTo,
  to,
  setShowPlot,
}) => {
  const [formValue, setFormValue] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState("...");
  const [snackbar, setSnackbar] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [fromSymbol, setFromSymbol] = useState("");
  const [toSymbol, setToSymbol] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value > 0) setFormValue(e.target.value);
  };

  useEffect(() => {
    if (typeof from === "undefined" || typeof to === "undefined") {
      setCalculatedValue("...");
    }
  }, [from, to, setCalculatedValue]);

  const handleCalculate = () => {
    calcCryptoPairRate(
      from,
      to,
      setIsLoading,
      setSnackbar,
      setCalculatedValue,
      formValue
    );
  };

  const handlePlot = () => {
    setShowPlot(true);
  };
  return (
    <Grid
      container
      maxWidth="md"
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
            <SearchCurrency
              text="From"
              setSymbol={setFrom}
              setCode={setFromSymbol}
              list={cryptoList}
              code="id"
              name="name"
            />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                pr: 2,
                pl: 2,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
                minWidth: 48,
              }}
              color="white"
            >
              {fromSymbol}
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
            <SearchCurrency
              text="To"
              setSymbol={setTo}
              setCode={setToSymbol}
              list={currencyList}
              code="id"
              name="id"
            />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                pr: 2,
                pl: 2,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
                minWidth: 48, //TODO wyrzucić do nowego komponentu lub ujednolicić style
              }}
              color="white"
            >
              {toSymbol}
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
              value={calculatedValue}
              sx={{ ml: -1 }}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <LoadingButton
          disabled={!!from & !!to ? false : true}
          fullWidth
          onClick={handleCalculate}
          loading={loading}
          variant="outlined"
        >
          Calculate
        </LoadingButton>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!!from & !!to ? false : true}
          onClick={handlePlot}
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          Plot
        </Button>
      </Grid>
      <ApiSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        api="binance"
      />
    </Grid>
  );
};
