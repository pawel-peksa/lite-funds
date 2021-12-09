import { Box, Paper, Typography, Container, Grid } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { SideNav } from "../components/SideNav";
import { BottomNav } from "../components/BottomNav";
import useMediaQuery from "@mui/material/useMediaQuery";
export const Dashboard = () => {
  const sideNavigation = useMediaQuery("(min-width:700px)");
  return (
    <>
      {!sideNavigation && (
        <Paper
          sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
          variant="outlined"
          square
        >
          <Typography
            variant="body1"
            component="h1"
            align="center"
            color="primary.main"
            sx={{ mt: 1, mb: 1, fontWeight: 500 }}
          >
            Lite Funds
          </Typography>
        </Paper>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          height: sideNavigation ? "100vh" : "calc(100vh-62px)",
          ml: sideNavigation ? "102px" : "",
          mt: sideNavigation ? "" : "22px",
          mb: sideNavigation ? "" : "40px",
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
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
      {sideNavigation ? <SideNav /> : <BottomNav />}
    </>
  );
};
