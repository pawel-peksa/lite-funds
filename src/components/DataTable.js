import { DataGrid } from "@mui/x-data-grid";
import { TextField, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { searchEndpoint } from "../api/searchEndpoint";

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
    field: "price",
    headerName: "Price",
    type: "number",
    minWidth: 50,
    flex: 0.1,
  },
  {
    field: "currency",
    headerName: "Currency",
    minWidth: 50,
    flex: 0.1,
  },
];

export const DataTable = ({ setAsset }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleChange = (e) => {
    searchEndpoint(e.target.value, setResults, setIsLoading);
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
        price: result["9. matchScore"],
        currency: result["8. currency"],
      };
    });
  }

  return (
    <Paper
      sx={{
        p: 2,
        pt: 1,
        pb: 1,
        display: "flex",
        flexDirection: "column",
        height: 360,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        color="primary.main"
        align="center"
      >
        Search asset
      </Typography>
      <TextField
        autoComplete="off"
        sx={{ mb: 2 }}
        id="standard-basic"
        label="Start typing to search..."
        variant="standard"
        onChange={handleChange}
      />
      <DataGrid
        disableColumnMenu={true}
        hideFooterSelectedRowCount={true}
        density="compact"
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          let selected = results.find(
            (result) => result["1. symbol"] === newSelectionModel.join()
          );
          setAsset({
            name: selected["2. name"],
            symbol: selected["1. symbol"],
            currency: selected["8. currency"],
          });
        }}
        selectionModel={selectionModel}
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
    </Paper>
  );
};
