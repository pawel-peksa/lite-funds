import { Box, Paper, Typography, Container, Grid } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { SideNav } from "../components/SideNav";
import { BottomNav } from "../components/BottomNav";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileTitle } from "../components/MobileTitle";
import { useTheme } from "@mui/material/styles";

export const Dashboard = () => {
  const theme = useTheme();
  const sideNavigation = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {!sideNavigation && <MobileTitle />}
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
        <Container
          maxWidth="xl"
          sx={{
            pl: sideNavigation ? null : 1,
            pr: sideNavigation ? null : 1,
            pt: 3,
            pb: 3,
          }}
        >
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
          <Copyright color="primary.main" />
        </Container>
      </Box>
      {sideNavigation ? <SideNav /> : <BottomNav />}
    </>
  );
};
