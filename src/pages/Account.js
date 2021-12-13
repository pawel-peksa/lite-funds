import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  IconButton,
  Box,
  Alert,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession } from "../auth/UserProvider";
import { changePassword } from "../auth/changePassword";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DeleteAccount } from "../components/DeleteAccount";

export const Account = () => {
  const { user } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); //don't loose focus on password input
  };

  let alert;
  if (status === true) {
    alert = <Alert severity="success">{message}</Alert>;
  }
  if (status === false) {
    alert = <Alert severity="error">{message}</Alert>;
  }

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={12} md={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" gutterBottom variant="h5" element="h2">
            Account settings
          </Typography>

          <Typography
            align="center"
            color="primary.main"
            variant="h6"
            element="span"
          >
            {user.email}
          </Typography>

          <Box
            onSubmit={handleSubmit(({ password, currentPassword }) => {
              setStatus(null);
              setMessage("");
              changePassword(
                user,
                currentPassword,
                password,
                setStatus,
                setMessage,
                setIsLoading
              );
            })}
            component="form"
            autoComplete="true"
            sx={{
              m: 2,
              mt: 4,
            }}
          >
            <Typography variant="body1">
              You can change your password here:
            </Typography>

            <TextField
              sx={{ display: "none" }}
              name="Email Address"
              label="Email Address"
              autoComplete="email"
            />

            <FormControl
              margin="dense"
              size="small"
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="old-password-with-toggle-sign-up">
                Current Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={errors.currentPassword ? true : false}
                {...register("currentPassword", {
                  required: "Please type your current password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                id="old-password-with-toggle-sign-up"
                autoComplete="current-password"
                label="Current Password"
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
                {errors?.currentPassword?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              margin="dense"
              size="small"
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="new-password-with-toggle-sign-up">
                New Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={errors.password ? true : false}
                {...register("password", {
                  required: "Please specify a new password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                id="new-password-with-toggle-sign-up"
                autoComplete="new-password"
                label="New Password"
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
            <FormControl
              margin="dense"
              size="small"
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="new-password-with-toggle-sign-up-confirmation">
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={errors.confirmPassword ? true : false}
                id="new-password-with-toggle-sign-up-confirmation"
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
                label="Confirm New Password"
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
              sx={{ mt: 1, mb: 3 }}
            >
              Change Password
            </Button>
            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
            )}
            {alert}
            <DeleteAccount />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
