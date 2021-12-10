import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import { createUser } from "../auth/createUser";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); //don't loose focus on password input
  };

  return (
    <>
      <Typography component="h1" variant="h4" sx={{ mt: 3 }}>
        Sign Up
      </Typography>
      <Box
        onSubmit={handleSubmit((data) => {
          createUser(data, navigate, setUserExists, setIsLoading);
        })}
        component="form"
        autoComplete="true"
        sx={{
          m: 2,
        }}
      >
        <TextField
          autoFocus
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
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailIcon sx={{ mr: "-5px" }} />
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

        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor="password-with-toggle-sign-up-confirmation">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            error={errors.confirmPassword ? true : false}
            id="password-with-toggle-sign-up-confirmation"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match";
                },
              },
            })}
            label="Confirm Password"
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
          <FormHelperText error>
            {errors?.confirmPassword?.message}
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Create an account
        </Button>
        {userExists && (
          <Alert severity="warning">
            User already exists. Go to sign in page
          </Alert>
        )}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        <Button
          fullWidth
          href="/sign-in"
          size="large"
          color="primary"
          sx={{ mt: 6 }}
        >
          Already a member? Sign In
        </Button>
      </Box>
    </>
  );
};
