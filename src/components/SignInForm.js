import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../auth/signInUser";
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
  FormHelperText,
  OutlinedInput,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

export const SignInForm = ({ setForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); //don't loose focus on password input
  };
  return (
    <>
      <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          signInUser(data, navigate, setIsLoading, setWrongCredentials);
        })}
        autoComplete="true"
        sx={{
          m: 2,
          pt: 2,
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
          {...register("email", {
            required: "Please type your email",
            pattern: {
              value:
                /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/,
              message: "Invalid email address",
            },
          })}
          label="Email Address"
          autoComplete="email"
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailIcon sx={{ mr: "-10px", width: "1.6em" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-up">
            Password
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            error={errors.password ? true : false}
            {...register("password", {
              required: "Please specify a password",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
            id="password-with-toggle-sign-up"
            autoComplete="new-password"
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>{errors?.password?.message}</FormHelperText>
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
        <div style={{ clear: "both" }}>
          {wrongCredentials.length > 0 && (
            <Alert severity="error">{wrongCredentials}</Alert>
          )}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </div>
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
