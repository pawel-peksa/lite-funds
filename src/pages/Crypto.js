import { Grid, Container } from "@mui/material";
import { ChartCrypto } from "../components/ChartCrypto";
import { useState } from "react";
import { SelectCrypto } from "../components/SelectCrypto";

export const Crypto = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{ flexDirection: "column", width: "100%" }}
      >
        <Grid item>
          <SelectCrypto setFrom={setFrom} from={from} setTo={setTo} to={to} />
        </Grid>

        <Grid item>
          <ChartCrypto from={from} to={to} />
        </Grid>
      </Grid>
    </Container>
  );
};
