import { Box, Paper, Typography, Container, Grid } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { SideNav } from "../components/SideNav";

export const Dashboard = () => {
  return (
    <>
      <SideNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          ml: "102px",
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 3, pb: 3, height: "100vh" }}>
          <Grid
            container
            rowSpacing={{ xs: 3, sm: 1, md: 2, lg: 3 }}
            columnSpacing={{ sm: 1, md: 2, lg: 3 }}
          >
            {/* Recent Deposits */}
            <Grid item xs={12} sm={5} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography>Tutaj był portfel</Typography>
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} sm={7} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography>Tutaj był chart</Typography>
              </Paper>
            </Grid>
            {/* MENU */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography>Tutaj był chart</Typography>
              </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <Typography>Tutaj była tabela</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <Typography>Tutaj była tabela</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Copyright color="primary.main" />
        </Container>
      </Box>
    </>
  );
};
