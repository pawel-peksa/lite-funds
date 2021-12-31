import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import AlertTitle from "@mui/material/AlertTitle";

export const ApiSnackbar = ({ snackbar, setSnackbar, api }) => {
  const [msg, setMsg] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const handleClose = () => {
    setSnackbar(false);
  };
  useEffect(() => {
    if (api === "binance") {
      setMsg(
        "It looks like this pair is not currently supported by our data provider... Try different currency. "
      );
    } else if (api === "alpha") {
      setShowProgress(true);
      setMsg(
        "To keep this site free of use, only 5 data calls per minute are allowed. Please wait a moment and try again."
      );
    }
  }, [api]);

  return (
    <Snackbar
      open={snackbar}
      autoHideDuration={9000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity="info" sx={{ border: "1px solid grey", mt: 14, p: 2 }}>
        <AlertTitle>Woops</AlertTitle>
        {msg}
        <Box sx={{ width: "100%", mt: 4 }}>
          {showProgress && <LinearProgress color="secondary" />}
        </Box>
      </Alert>
    </Snackbar>
  );
};
