import { Grid, Paper, Typography, Button, Box, Divider } from "@mui/material";
import { useState } from "react";
import { TransactionStep1 } from "../components/TransactionStep1";
import { TransactionStep2 } from "../components/TransactionStep2";
import { TransactionStep3 } from "../components/TransactionStep3";

export const Transaction = () => {
  const [asset, setAsset] = useState("");
  const [checked, setChecked] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [results, setResults] = useState([]);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [commission, setCommission] = useState(0);
  const [comment, setComment] = useState("");
  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    setAsset(event.target.value);
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleNext = () => {
    console.log("buy?", checked);
    console.log("asset:", asset);
    console.log("selected:", selected);
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    console.log("buy?", checked);
    console.log("asset:", asset);
    setStep((step) => step - 1);
  };

  const handleAdd = () => {
    console.log("add");
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
        selected={selected}
        setSelected={setSelected}
        results={results}
        setResults={setResults}
        setCurrency={setCurrency}
        asset={asset}
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
      <Grid item xs={12} md={7}>
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
                    {" > "} {selected}
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
              disabled={step === 1 ? true : false}
              variant="contained"
              disableElevation
              onClick={handleBack}
            >
              Back
            </Button>
            {step === 3 ? (
              <Button
                disabled={price > 0 && qty > 0 ? false : true}
                variant="contained"
                disableElevation
                onClick={handleAdd}
              >
                Add Transaction
              </Button>
            ) : (
              <Button
                disabled={
                  (step === 1 && asset.length < 1) || (step === 2 && !selected)
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
        </Paper>
      </Grid>
    </Grid>
  );
};
