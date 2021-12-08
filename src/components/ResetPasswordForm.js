import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

export const ResetPasswordForm = ({ setForgotPassword }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setForgotPassword(false);
  };

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 10 }}>
        Reset your password
      </Typography>
      <Box
        onSubmit={handleSubmit}
        component="form"
        noValidate
        autoComplete
        sx={{
          m: 2,
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          name="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailIcon sx={{ mr: "-5px" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Generate new password
        </Button>

        <Button
          onClick={() => setForgotPassword(false)}
          size="medium"
          color="primary"
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIosOutlinedIcon />}
        >
          Go back
        </Button>
      </Box>
    </>
  );
};
