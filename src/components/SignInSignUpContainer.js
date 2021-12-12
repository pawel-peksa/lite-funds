import { Grid, Paper, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Copyright } from "./Copyright";
import { Navigate } from "react-router-dom";
import { useSession } from "../auth/UserProvider";

export const SignInSignUpContainer = () => {
  const { user } = useSession();

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
