import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const ApiSnackbar = ({ snackbar, setSnackbar }) => {
  const handleClose = () => {
    setSnackbar(false);
  };

  return (
    <Snackbar
      open={snackbar}
      sx={{ p: 3 }}
      autoHideDuration={8000}
      message="To keep this site free of use, only 5 data calls per minute are allowed.  Please wait a moment and try again."
      // action={action}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity="info">
        To keep this site free of use, only 5 data calls per minute are allowed.
        <br />
        Please wait a moment and try again.
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress color="info" />
        </Box>
      </Alert>
    </Snackbar>
  );
};
