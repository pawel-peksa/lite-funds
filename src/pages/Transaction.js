import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { TransactionStep1 } from "../components/TransactionStep1";
import { TransactionStep2 } from "../components/TransactionStep2";
import { TransactionStep3 } from "../components/TransactionStep3";

export const Transaction = () => {
  const [asset, setAsset] = useState("");
  const [checked, setChecked] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [date, setDate] = useState(new Date());

  const handleChange = (event) => {
    setAsset(event.target.value);
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleNext = () => {
    console.log("buy?", checked);
    console.log("asset:", asset);
    setStep((step) => step + 1);
  };

  const handleBack = () => {
    console.log("buy?", checked);
    console.log("asset:", asset);
    setStep((step) => step - 1);
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
    body = <TransactionStep2 selected={selected} setSelected={setSelected} />;
  else if (step === 3)
    body = (
      <TransactionStep3 date={date} setDate={setDate} selected={selected} />
    );

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
          {body}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              disabled={step === 1 ? true : false}
              variant="contained"
              disableElevation
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              disabled={
                (step === 1 && asset.length < 1) ||
                (step === 2 && selected.length < 1)
                  ? true
                  : false
              }
              disableElevation
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
