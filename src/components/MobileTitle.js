import { Paper, Typography } from "@mui/material";

export const MobileTitle = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "primary.main",
        zIndex: 10000,
      }}
      variant="outlined"
      square
    >
      <Typography
        variant="body1"
        component="h1"
        align="center"
        color="white"
        sx={{ mt: 1, mb: 1, fontWeight: 500 }}
      >
        Lite Funds
      </Typography>
    </Paper>
  );
};
