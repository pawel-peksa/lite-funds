import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const ApiSnackbar = ({ snackbar, setSnackbar, api }) => {
  const handleClose = () => {
    setSnackbar(false);
  };
  let msg;
  let showProgress;
  if ((api = "binance")) {
    msg =
      "It looks like this pair is not currently supported by our data provider... Try different currency. ";
  } else {
    showProgress = true;
    msg =
      "To keep this site free of use, only 5 data calls per minute are allowed. Please wait a moment and try again.";
  }

  return (
    <Snackbar
      open={snackbar}
      sx={{ p: 3 }}
      autoHideDuration={8000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity="info">
        {msg}
        <Box sx={{ width: "100%", mt: 2 }}>
          {showProgress && <LinearProgress color="info" />}
        </Box>
      </Alert>
    </Snackbar>
  );
};
