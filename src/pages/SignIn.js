import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { OutlinedInputPassword } from "../components/OutlinedInputPassword";

const handleSubmit = (e) => {
  e.preventDefault();
};

export const SignIn = () => {
  return (
    <>
      <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        {/* <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        /> */}
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-in">
            Password
          </InputLabel>
          <OutlinedInputPassword
            id="password-with-toggle-sign-in"
            name="password"
            label="Password"
            autoComplete="current-password"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Sign In
        </Button>
        <Link href="#" color="secondary.500" sx={{ float: "right" }}>
          Forgot password?
        </Link>
        <Button
          fullWidth
          href="/sign-up"
          size="large"
          color="primary"
          sx={{ mt: 6 }}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </>
  );
};
