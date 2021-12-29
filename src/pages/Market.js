import { Grid, Container, Paper } from "@mui/material";
import { DataTable } from "../components/DataTable";
import { Chart } from "../components/Chart";
import { useState } from "react";

export const Market = () => {
  const [asset, setAsset] = useState({});
  const [showPlot, setShowPlot] = useState(false);
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{ flexDirection: "column", width: "100%" }}
      >
        <Grid item>
          <Paper
            sx={{
              p: 2,
              pt: 1,
              pb: 1,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <DataTable
              asset={asset}
              setAsset={setAsset}
              setShowPlot={setShowPlot}
            />
          </Paper>
        </Grid>

        <Grid item>{showPlot && <Chart asset={asset} />}</Grid>
      </Grid>
    </Container>
  );
};
