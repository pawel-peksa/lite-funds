import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { resetPasswordMail } from "../auth/resetPasswordMail";

export const ResetPasswordForm = ({ setForgotPassword }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let alert;
  if (status === "ok") {
    alert = <Alert severity="success">{message}</Alert>;
  }
  if (status === "error") {
    alert = <Alert severity="error">{message}</Alert>;
  }

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 10 }}>
        Reset your password
      </Typography>
      <Box
        onSubmit={handleSubmit(({ email }) => {
          setStatus(null);
          setMessage("");
          resetPasswordMail(email, setStatus, setMessage, setIsLoading);
        })}
        component="form"
        autoComplete="true"
        sx={{
          m: 2,
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Generate new password
        </Button>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {(status === "ok" || status === "error") && alert}
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
