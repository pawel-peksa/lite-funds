import { Grid, Typography, TextField, Button } from "@mui/material";
import { SearchCurrency } from "./SearchCurrency";

export const CalculateCurrency = ({ setFrom, from, setTo, to }) => {
  return (
    <Grid
      container
      maxWidth="sm"
      sx={{ justifyContent: "center", mt: 3 }}
      rowSpacing={1}
    >
      <Grid
        container
        item
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid
          item
          container
          rowSpacing={1}
          md={6}
          xs={12}
          sx={{
            flexDirection: "column",
          }}
        >
          <Grid item>
            <SearchCurrency text="From" setSymbol={setFrom} />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
              }}
              color="white"
            >
              {from}
            </Typography>
            <TextField sx={{ ml: -1 }} size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid
          item
          container
          rowSpacing={1}
          md={6}
          xs={12}
          sx={{ flexDirection: "column" }}
        >
          <Grid item>
            <SearchCurrency text="To" setSymbol={setTo} />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography
              sx={{
                bgcolor: "primary.main",
                p: 1,
                borderRadius: "4px 0 0 4px",
                display: "inline-block",
                zIndex: 10,
              }}
              color="white"
            >
              {to}
            </Typography>
            <TextField sx={{ ml: -1 }} size="small" fullWidth />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={6} xs={12}>
          <Button fullWidth variant="contained">
            Calculate
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Button fullWidth variant="contained">
            Plot
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
