import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { TransactionStep1 } from "../components/TransactionStep1";
import { TransactionStep2 } from "../components/TransactionStep2";
import { TransactionStep3 } from "../components/TransactionStep3";
import { addTransaction } from "../db/addTransaction";
import { useSession } from "../auth/UserProvider";

export const Transaction = () => {
  const [asset, setAsset] = useState("");
  const [checked, setChecked] = useState(true);
  const [step, setStep] = useState(1);
  const [symbol, setSymbol] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [results, setResults] = useState([]);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [commission, setCommission] = useState(0);
  const [comment, setComment] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSession();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  const handleChange = (event) => {
    setAsset(event.target.value);
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    setStep((step) => step - 1);
  };

  const handleAdd = async () => {
    await addTransaction(
      user,
      checked,
      asset,
      symbol,
      currency,
      date,
      price,
      qty,
      commission,
      comment,
      product,
      setIsLoading
    );
    setOpen(true);
    setSymbol(undefined);
    setPrice(0);
    setCommission(0);
    setQty(0);
    setDate(new Date());
    setComment("");
    setCurrency("EUR");
    setAsset("");
    setResults([]);
  };

  let body;
  if (step === 1)
    body = (
      <TransactionStep1
        handleChange={handleChange}
        handleSwitch={handleSwitch}
        value={asset}
        checked={checked}
      />
    );
  else if (step === 2)
    body = (
      <TransactionStep2
        symbol={symbol}
        setSymbol={setSymbol}
        results={results}
        setResults={setResults}
        setCurrency={setCurrency}
        asset={asset}
        setProduct={setProduct}
        product={product}
      />
    );
  else if (step === 3)
    body = (
      <TransactionStep3
        date={date}
        setDate={setDate}
        price={price}
        setPrice={setPrice}
        qty={qty}
        setQty={setQty}
        commission={commission}
        setCommission={setCommission}
        comment={comment}
        setComment={setComment}
        currency={currency}
      />
    );

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={12} md={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 350,
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

          {step > 1 && (
            <>
              <Typography
                color="primary.main"
                variant="body2"
                element="h3"
                sx={{ ml: 2, mb: 1 }}
              >
                {checked ? "Buy" : "Sell"}
                {" > "} {asset}
                {step > 2 && (
                  <>
                    {" > "} {symbol}
                  </>
                )}
              </Typography>
            </>
          )}
          <Divider />
          {body}
          <Box sx={{ flexGrow: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              pl: 2,
              pr: 2,
            }}
          >
            <Button
              sx={{ visibility: step === 1 ? "hidden" : "" }}
              variant="contained"
              disableElevation
              onClick={handleBack}
            >
              Back
            </Button>
            {step === 3 ? (
              <LoadingButton
                disabled={price > 0 && qty > 0 ? false : true}
                variant="contained"
                disableElevation
                onClick={handleAdd}
                loading={isLoading}
              >
                Add Transaction
              </LoadingButton>
            ) : (
              <Button
                disabled={
                  (step === 1 && asset.length < 1) || (step === 2 && !symbol)
                    ? true
                    : false
                }
                disableElevation
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ width: 500, height: 100, ml: 4 }}
            // TransitionComponent={<Slide direction="up" />}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Success!</AlertTitle>
              Transaction has been added
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
};
