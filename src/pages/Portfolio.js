import { getAssets } from "../db/getAssets";
import { Grid, Paper, Typography } from "@mui/material";
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

export const Portfolio = () => {
  const { user } = useSession();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const theme = useTheme();
  const padding = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setIsLoading(true);
    getAssets(user, setAssets, setIsLoading);
  }, [user]);

  useEffect(() => {
    setBalance(calculateBalance(assets));
    setProfitLoss(calculateProfitLoss(assets));
  }, [assets]);

  return (
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
              <PieChartWallet assets={assets} />
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
};
