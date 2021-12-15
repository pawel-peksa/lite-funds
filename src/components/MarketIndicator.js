import { Paper, Typography, Skeleton } from "@mui/material";
import { fetchEndpoint } from "../api/fetchEndpoint";
import { useState, useEffect } from "react";

export const MarketIndicator = ({ ticker }) => {
  let [price, setPrice] = useState("");
  let [change, setChange] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEndpoint(ticker, setPrice, setChange, setIsLoading);
  }, [ticker]);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 120,
      }}
    >
      <Typography color="text.secondary">{ticker}</Typography>
      <Typography variant="h6" component="div">
        {isLoading ? <Skeleton /> : price}
      </Typography>
      <Typography variant="body2">
        {isLoading ? <Skeleton /> : change}
      </Typography>
    </Paper>
  );
};
