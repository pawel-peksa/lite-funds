import { getAssets } from "../db/getAssets";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "../auth/UserProvider";
import { TableOfAssets } from "../components/TableOfAssets";

export const Portfolio = () => {
  const { user } = useSession();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAssets(user, setAssets, setIsLoading);
  }, [user]);

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
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
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
