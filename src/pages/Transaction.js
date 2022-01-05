import {
  Grid,
  Paper,
  Typography,
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

// TODO user cannot sell assets he does not have! Maybe sell is not needed for this project????

export const Transaction = () => {
  const [asset, setAsset] = useState("");
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
  };

  const handleChange = (event) => {
    setAsset(event.target.value);
    setSymbol(undefined);
    setResults([]);
    setPrice(0);
    setQty(0);
  };

  const handleAdd = async () => {
    await addTransaction(
      user,
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

  let body = (
    <>
      <TransactionStep1 handleChange={handleChange} value={asset} />
      {asset && (
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
      )}
      {symbol && (
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
          asset={asset}
        />
      )}
    </>
  );

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={12} md={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 250,
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
          <Divider sx={{ mb: 2 }} />
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
            {asset && symbol && date && qty > 0 && price > 0 && (
              <LoadingButton
                disabled={price > 0 && qty > 0 ? false : true}
                variant="contained"
                disableElevation
                onClick={handleAdd}
                loading={isLoading}
                fullWidth
              >
                Add Transaction
              </LoadingButton>
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
