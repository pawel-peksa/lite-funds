import { Grid, Paper, Typography } from "@mui/material";

export const Portfolio = () => {
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
      columnSpacing={{ sm: 1, md: 2, lg: 3 }}
    >
      {/* Status */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Status
          </Typography>
        </Paper>
      </Grid>
      {/* Pie Chart / allocation */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Allocation on Pie Chart / Bar Chart
          </Typography>
        </Paper>
      </Grid>
      {/* Free Slot */}
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Don't know yet...
          </Typography>
        </Paper>
      </Grid>

      {/* Table of assets */}
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Table of assets
          </Typography>
        </Paper>
      </Grid>
      {/* Value over Time Chart */}
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Value over Time Chart
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
