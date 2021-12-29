import { TextField, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { searchEndpoint } from "../api/searchEndpoint";
import SearchIcon from "@mui/icons-material/Search";

const MyTable = ({ results, setSymbol, setCurrency, setProduct }) => {
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
  const onRowClick = (row) => {
    setSymbol(row.row.id);
    setCurrency(row.row.currency);
    setProduct(row.row.name);
  };
  return (
    <DataGrid
      disableColumnMenu={true}
      hideFooterSelectedRowCount={true}
      rowsPerPageOptions={[5]}
      pageSize={5}
      density="compact"
      onRowClick={onRowClick}
      rows={rows}
      columns={columns}
      sx={{
        backgroundColor: "white",
        border: "none",
      }}
    />
  );
};

export const SearchStock = ({
  symbol,
  setSymbol,
  results,
  setResults,
  setCurrency,
  setProduct,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    searchEndpoint(search, setResults, setIsLoading);
  };

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
          variant="outlined"
        >
          Search
        </LoadingButton>
      </Box>
      <Box sx={{ height: 300 }}>
        <MyTable
          results={results}
          setSymbol={setSymbol}
          setCurrency={setCurrency}
          setProduct={setProduct}
        />
      </Box>
      {results?.length > 0 &&
        results.find((obj) => obj["1. symbol"] === symbol) && (
          <Typography
            align="center"
            color="primary.main"
            sx={{ fontSize: 18, mt: 3 }}
          >
            [{symbol}]{" "}
            {results.find((obj) => obj["1. symbol"] === symbol)["2. name"]} -{" "}
            {results.find((obj) => obj["1. symbol"] === symbol)["4. region"]} (
            {results.find((obj) => obj["1. symbol"] === symbol)["8. currency"]})
          </Typography>
        )}
    </>
  );
};
