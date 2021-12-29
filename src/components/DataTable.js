import { DataGrid } from "@mui/x-data-grid";
import { TextField, Typography, Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { searchEndpoint } from "../api/searchEndpoint";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    field: "id",
    headerName: "Symbol",
    minWidth: 50,
    flex: 0.1,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 130,
    flex: 0.5,
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 50,
    flex: 0.1,
  },
  {
    field: "region",
    headerName: "Region",
    minWidth: 70,
    flex: 0.15,
  },
  {
    field: "currency",
    headerName: "Currency",
    minWidth: 50,
    flex: 0.1,
  },
];

export const DataTable = ({ setAsset, setShowPlot, asset }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    searchEndpoint(search, setResults, setIsLoading);
  };

  const onRowClick = (row) => {
    setAsset({
      name: row.row.name,
      symbol: row.row.id,
      currency: row.row.currency,
    });
  };

  let rows;
  if (typeof results === "undefined") {
    rows = [];
  } else {
    rows = results.map((result) => {
      return {
        id: result["1. symbol"],
        name: result["2. name"],
        type: result["3. type"],
        region: result["4. region"],
        currency: result["8. currency"],
      };
    });
  }

  return (
    <>
      <Box
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="primary.main"
          align="center"
          sx={{ ml: -2 }}
        >
          Search asset:
        </Typography>
        <TextField
          sx={{ ml: 2 }}
          variant="standard"
          autoComplete="off"
          id="standard-basic"
          label="Asset name..."
          onChange={handleChange}
        />
        <LoadingButton
          disableElevation
          size="small"
          sx={{ ml: 2 }}
          onClick={handleClick}
          endIcon={<SearchIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
        >
          Search
        </LoadingButton>
        <Button
          variant="contained"
          size="small"
          sx={{ ml: 2 }}
          disabled={typeof asset.symbol === "undefined" ? true : false}
          onClick={() => setShowPlot(true)}
        >
          Plot
        </Button>
      </Box>
      <DataGrid
        disableColumnMenu={true}
        hideFooterSelectedRowCount={true}
        density="compact"
        onRowClick={onRowClick}
        loading={isLoading}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[4]}
        pageSize={4}
        sx={{
          backgroundColor: "white",
          border: "none",
        }}
      />
    </>
  );
};
