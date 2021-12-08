import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
        Sign Up
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
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
        />
        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Create an account
        </Button>

        <Button
          fullWidth
          href="/sign-in"
          size="large"
          color="primary"
          sx={{ mt: 6 }}
        >
          Already a memeber? Sign In
        </Button>
      </Box>
    </>
  );
};
