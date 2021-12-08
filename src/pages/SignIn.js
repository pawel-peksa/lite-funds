import React from "react";
import { Modal } from "../components/Modal";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";

export const SignIn = () => {
  return (
    <Modal>
      <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
        Sign in
      </Typography>
      <Box
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
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link href="#" color="secondary.500">
          Forgot password?
        </Link>
        <Button fullWidth href="#" color="primary" sx={{ mt: 5 }}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Modal>
  );
};
