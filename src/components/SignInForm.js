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
import MailIcon from "@mui/icons-material/Mail";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { InputToggleView } from "../components/InputToggleView";

export const SignInForm = ({ setForgotPassword }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
          pt: 2,
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

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-in">
            Password
          </InputLabel>
          <InputToggleView
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
        <Link
          onClick={() => setForgotPassword(true)}
          color="secondary.500"
          sx={{ float: "right", cursor: "pointer" }}
        >
          Forgot password?
        </Link>
        <Button
          fullWidth
          href="/sign-up"
          size="large"
          color="primary"
          sx={{ mt: 6 }}
          endIcon={<PersonAddAltRoundedIcon />}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </>
  );
};
