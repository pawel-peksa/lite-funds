import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { OutlinedInputPassword } from "../components/OutlinedInputPassword";

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
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-up">
            Password
          </InputLabel>
          <OutlinedInputPassword
            id="password-with-toggle-sign-up"
            name="password"
            label="Password"
          />
        </FormControl>

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-up-confirmation">
            Confirm Password
          </InputLabel>
          <OutlinedInputPassword
            id="password-with-toggle-sign-up-confirmation"
            name="confirmPassword"
            label="Confirm Password"
          />
        </FormControl>

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
