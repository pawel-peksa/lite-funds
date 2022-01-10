import { getAssets } from "../db/getAssets";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "../auth/UserProvider";
import { useTheme } from "@mui/material/styles";
import { TableOfAssets } from "../components/TableOfAssets";
import { Status } from "../components/Status";
import { calculateBalance } from "../functions/calculateBalance";
import { calculateProfitLoss } from "../functions/calculateProfitLoss";
import { PieChartWallet } from "../components/PieChartWallet";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BarChartWallet } from "../components/BarChartWallet";
import { ChartOverTime } from "../components/ChartOverTime";
import CircleLoader from "react-spinners/CircleLoader";

export const Portfolio = ({ setShow }) => {
  const { user } = useSession();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const theme = useTheme();
  const padding = useMediaQuery(theme.breakpoints.up("md"));
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [emptyAssets, setEmptyAssets] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAssets(user, setAssets, setIsLoading, setEmptyAssets);
  }, [user]);

  useEffect(() => {
    setBalance(calculateBalance(assets));
    setProfitLoss(calculateProfitLoss(assets));
    let filteredStocks = assets.filter((asset) => asset.type === "stocks");
    let filteredCrypto = assets.filter((asset) => asset.type === "crypto");
    setStocks(filteredStocks);
    setCrypto(filteredCrypto);
  }, [assets]);

  let loadingScreen = (
    <Paper
      sx={{
        height: "calc(100vh - 100px)",
      }}
    >
      <Typography
        variant="body2"
        component="p"
        align="center"
        color="secondary.main"
        sx={{ fontWeight: 200, pt: 3, fontSize: 18 }}
      >
        Welcome to
      </Typography>
      <Typography
        variant="body1"
        component="h1"
        align="center"
        color="primary.main"
        sx={{ fontWeight: 500, fontSize: 20 }}
      >
        Lite Funds
      </Typography>
      <Typography
        variant="body2"
        component="p"
        align="center"
        color="secondary.main"
        sx={{ fontWeight: 200, fontSize: 13 }}
      >
        by Paweł Peksa
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "60%",
        }}
      >
        <CircleLoader size={100} color="teal" />
        <Typography
          variant="body1"
          component="h2"
          color="secondary"
          sx={{ mt: 3 }}
        >
          loading data...
        </Typography>
      </Box>
    </Paper>
  );

  let mainScreen;
  if (emptyAssets === true) {
    mainScreen = (
      <Paper
        sx={{
          height: "calc(100vh - 100px)",
        }}
      >
        <Typography
          variant="body2"
          component="p"
          align="center"
          color="secondary.main"
          sx={{ fontWeight: 200, pt: 3, fontSize: 18 }}
        >
          Welcome to
        </Typography>
        <Typography
          variant="body1"
          component="h1"
          align="center"
          color="primary.main"
          sx={{ fontWeight: 500, fontSize: 20 }}
        >
          Lite Funds
        </Typography>
        <Typography
          variant="body2"
          component="p"
          align="center"
          color="secondary.main"
          sx={{ fontWeight: 200, fontSize: 13 }}
        >
          by Paweł Peksa
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "60%",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            color="primary.main"
          >
            It looks like you are here for the first time!
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="secondary.main"
            gutterBottom
          >
            Add your first asset you want to track in the transaction section.
          </Typography>
          <Button
            onClick={() => setShow("transaction")}
            sx={{ mb: 1 }}
            variant="contained"
          >
            Add your first transaction
          </Button>
        </Box>
      </Paper>
    );
  } else {
    mainScreen = (
      <Grid container spacing={{ xs: 1 }}>
        {/* Firs row container green*/}
        <Grid item container spacing={{ xs: 1 }}>
          {/* Firs row container blue*/}
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={12}
            lg={7}
            rowSpacing={{ xs: 1 }}
          >
            {/* Status */}
            <Grid item md={5} sm={12} xs={12} sx={{ pr: padding ? 1 : 0 }}>
              <Paper
                sx={{
                  p: 1,
                  height: 250,
                }}
              >
                <Status balance={balance} profitLoss={profitLoss} />
              </Paper>
            </Grid>
            {/* Pie Chart */}
            <Grid item md={7} xs={12} sm={12}>
              <Paper
                sx={{
                  p: 1,
                  height: 250,
                }}
              >
                <PieChartWallet stocks={stocks} crypto={crypto} />
              </Paper>
            </Grid>
            {/* Value over Time Chart */}
            <Grid item md={12} xs={12} sm={12} rowSpacing={{ xs: 1 }}>
              <Paper
                sx={{
                  p: 1,
                  height: 392,
                }}
              >
                <ChartOverTime stocks={stocks} crypto={crypto} />
              </Paper>
            </Grid>
          </Grid>

          {/* Bar chart*/}
          <Grid item lg={5} xs={12} md={12} sm={12}>
            <Paper
              sx={{
                p: 1,
                height: 650,
              }}
            >
              <BarChartWallet assets={assets} />
            </Paper>
          </Grid>
        </Grid>
        {/* Table of assets */}
        <Grid item md={12} xs={12} sm={12}>
          <Paper
            sx={{
              p: 1,
              height: 560,
            }}
          >
            <TableOfAssets isLoading={isLoading} assets={assets} />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return isLoading ? loadingScreen : mainScreen;
};
