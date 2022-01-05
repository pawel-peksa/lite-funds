import { getAssets } from "../db/getAssets";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "../auth/UserProvider";
import { TableOfAssets } from "../components/TableOfAssets";
import { Status } from "../components/Status";
import { calculateBalance } from "../functions/calculateBalance";
import { calculateProfitLoss } from "../functions/calculateProfitLoss";
import { PieChartWallet } from "../components/PieChartWallet";
import { getCryptoHistory } from "../api/cryptoApi2";
import { yFinanceFetchStock } from "../api/yFinance";

export const Portfolio = () => {
  const { user } = useSession();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAssets(user, setAssets, setIsLoading);
  }, [user]);

  useEffect(() => {
    setBalance(calculateBalance(assets));
    setProfitLoss(calculateProfitLoss(assets));
  }, [assets]);

  const handleBtnClick = () => {
    // yFinance();
    yFinanceFetchStock("IBM", undefined, undefined, undefined, "chuj");
  };
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
          <Status balance={balance} profitLoss={profitLoss} />
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
          {/* <PieChartWallet assets={assets} /> */}
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
            <Button onClick={handleBtnClick}>Check APi</Button>
          </Typography>
        </Paper>
      </Grid>

      {/* Table of assets */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
        >
          <TableOfAssets isLoading={isLoading} assets={assets} />
        </Paper>
      </Grid>
      {/* Value over Time Chart */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
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
