import {
  Typography,
  Box,
  Avatar,
  FormControlLabel,
  Button,
  Alert,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useSession } from "../auth/UserProvider";
import { deleteUser } from "firebase/auth";
export const AccountGoogle = () => {
  const { user } = useSession();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDelete = async () => {
    setError(false);
    try {
      await deleteUser(user);
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        m: 2,
        mt: 4,
      }}
    >
      <Typography variant="body1" align="center">
        Hello {user.displayName}! <br />
      </Typography>
      <Avatar
        sx={{ margin: "15px auto" }}
        alt={user.displayName}
        src={user.photoURL}
      />
      <Typography sx={{ mt: 3 }} variant="body1" align="center">
        You've signed In with your Google Account. <br />
      </Typography>

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
        onClick={handleDelete}
      >
        Delete account
      </Button>
      {error && (
        <Alert sx={{ mt: 2 }} severity="info">
          Due to safety reasons you can delete your account only after a recent
          SignIn. Please log out and SingIn with Google again to be able to
          delete your account.
        </Alert>
      )}
    </Box>
  );
};
