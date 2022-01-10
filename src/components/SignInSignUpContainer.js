import { Grid, Paper, Container, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Copyright } from "./Copyright";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../auth/UserProvider";
import { signInUser } from "../auth/signInUser";

export const SignInSignUpContainer = () => {
  const { user } = useSession();
  const navigate = useNavigate();

  const handleDemoAccount = () => {
    signInUser(
      { email: "litefunds.demo@gmail.com", password: "123456qwerty" },
      navigate,
      undefined,
      undefined
    );
  };

  if (user?.emailVerified) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Grid
        container
        component="main"
        alignItems="center"
        justify="center"
        sx={{ minHeight: "100vh", backgroundColor: "primary.main" }}
      >
        <Button
          variant="outlined"
          onClick={handleDemoAccount}
          sx={{
            background: "white",
            position: "absolute",
            top: 10,
            right: 10,
            "&:hover": {
              color: "white",
            },
          }}
        >
          Demo account
        </Button>
        <Container maxWidth="xs">
          <Paper
            elevation={5}
            sx={{
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
              position: "relative",
            }}
          >
            <Outlet />
          </Paper>
          <Copyright color="secondary.light" />
        </Container>
      </Grid>
    );
  }
};
