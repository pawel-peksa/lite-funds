import { Grid, Container } from "@mui/material";
import { DataTable } from "../components/DataTable";
import { Chart } from "../components/Chart";
import { useState } from "react";

export const Market = () => {
  const [asset, setAsset] = useState({
    name: "Apple Inc",
    symbol: "AAPL",
    currency: "USD",
  });
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{ flexDirection: "column", width: "100%" }}
      >
        <Grid item>
          <DataTable setAsset={setAsset} />
        </Grid>

        <Grid item>
          <Chart asset={asset} />
        </Grid>
      </Grid>
    </Container>
  );
};