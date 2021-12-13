import { deleteCurrentUser } from "../auth/deleteCurrentUser";
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  IconButton,
  Box,
  Alert,
  TextField,
  Modal,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession } from "../auth/UserProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const DeleteAccount = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSession();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClickShowPasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    <>
      <FormControlLabel
        sx={{ mt: 5 }}
        control={
          <Checkbox
            checked={checked}
            color="error"
            size="small"
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="I want to delete my account and erase all data"
      />
      {checked && (
        <Alert severity="error">
          Deleted account cannot be recovered. All data will be deleted
          permanently.
        </Alert>
      )}
      <br />
      <Button
        color="error"
        variant="contained"
        size="small"
        disabled={!checked}
        onClick={handleOpen}
      >
        Delete account
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <TextField
            sx={{ display: "none" }}
            name="Email Address"
            label="Email Address"
            autoComplete="email"
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete account permanently
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body2"
            sx={{ mt: 2 }}
            gutterBottom
          >
            To delete your account please provide your password
          </Typography>
          <FormControl margin="dense" size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="delete-password-with-toggle-sign-up">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPasswordModal ? "text" : "password"}
              error={errors.currentPassword ? true : false}
              {...register("currentPassword", {
                required: "Please type your current password",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              id="delete-password-with-toggle-sign-up"
              autoComplete="current-password"
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordModal}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPasswordModal ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error>
              {errors?.currentPassword?.message}
            </FormHelperText>
          </FormControl>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={handleSubmit(({ currentPassword }) => {
              deleteCurrentUser(user, currentPassword, setStatus, setMessage);
            })}
          >
            Delete account
          </Button>
          {alert}
        </Box>
      </Modal>
    </>
  );
};
