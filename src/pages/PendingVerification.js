import { useSession } from "../auth/UserProvider";
import { Grid, Paper, Container, Typography, Alert, Link } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../auth/signOutUser";
import { useEffect } from "react";

export const PendingVerification = () => {
  const { user } = useSession();
  const navigate = useNavigate();

  const handleClick = () => {
    signOutUser();
    navigate("/sign-up");
  };

  // User has switched back to the tab
  const onFocus = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", onFocus);
    // Specify how to clean up after this effect:
    return () => {
      document.removeEventListener("visibilitychange", onFocus);
    };
  });

  if (user?.emailVerified === true) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Grid
        container
        component="main"
        justify="center"
        sx={{ minHeight: "100vh", pt: 10, backgroundColor: "primary.main" }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={5}
            sx={{
              minHeight: 200,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography align="center" variant="body1" component="h1">
              Verification email has been sent to <b>{user?.email}</b>
            </Typography>
            <Alert severity="info">
              Please check your inbox and confirm your email address.
            </Alert>
            <Link
              onClick={handleClick}
              color="secondary.500"
              align="right"
              sx={{ cursor: "pointer" }}
            >
              Try with different Email
            </Link>
          </Paper>
          <Copyright color="secondary.light" />
        </Container>
      </Grid>
    );
  }
};
