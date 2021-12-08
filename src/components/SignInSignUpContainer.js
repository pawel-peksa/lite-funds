import { Grid, Paper, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Copyright } from "./Copyright";

export const SignInSignUpContainer = ({ children }) => {
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
        <Copyright
          sx={{
            position: "fixed",
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        />
      </Container>
    </Grid>
  );
};
