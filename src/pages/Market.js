import { Grid, Container } from "@mui/material";
import { MarketIndicator } from "../components/MarketIndicator";
import { DataTable } from "../components/DataTable";
import { Chart } from "../components/Chart";
import { useState } from "react";

export const Market = () => {
  const [asset, setAsset] = useState([]);
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid
          item
          container
          spacing={2}
          lg={10}
          sx={{ flexDirection: "column", width: "100%" }}
        >
          <Grid item>
            <DataTable setAsset={setAsset} />
          </Grid>

          <Grid item>
            <Chart asset={asset} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          item
          md={0}
          lg={2}
          sx={{ flexDirection: "column", width: "100%" }}
        >
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
          <Grid item>
            <MarketIndicator ticker="IBM" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

// {/* <Grid
// container
// rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
// columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
// >
// <Grid
//   container
//   item
//   sx={{ flexDirection: "column" }}
//   sm={12}
//   md={8}
//   lg={8}
//   rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
//   columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
// >
//   {/* Chart */}
//   <Grid item xs={12} md={12}>
//     <Chart />
//   </Grid>

//   {/* Data grid */}
//   <Grid item xs={12} md={12}>
//     <DataTable />
//   </Grid>
// </Grid>
// <Grid
//   item
//   sm={12}
//   md={4}
//   lg={4}
//   sx={{ flexDirection: "column" }}
//   container
//   rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
//   columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
// >
//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>

//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>

//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>

//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>
//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>

//   {/* Status */}
//   <Grid item xs={6} sm={4} md={4} lg={2}>
//     <MarketIndicator ticker="IBM" />
//   </Grid>
// </Grid>
// </Grid> */}
