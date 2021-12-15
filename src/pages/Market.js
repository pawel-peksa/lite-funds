import { Grid, Container } from "@mui/material";
import { MarketIndicator } from "../components/MarketIndicator";
import { DataTable } from "../components/DataTable";
import { Chart } from "../components/Chart";

export const Market = () => {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
        columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
      >
        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>

        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>

        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>

        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>
        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>

        {/* Status */}
        <Grid item xs={6} sm={4} md={4} lg={2}>
          <MarketIndicator ticker="IBM" />
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={12}>
          <Chart />
        </Grid>

        {/* Data grid */}
        <Grid item xs={12} md={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Container>
  );
};
