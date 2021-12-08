import { Grid, Paper, Container } from "@mui/material";

export const Modal = ({ children }) => {
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
          }}
        >
          {children}
        </Paper>
      </Container>
    </Grid>
  );
};
