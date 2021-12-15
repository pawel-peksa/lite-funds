import { DataGrid } from "@mui/x-data-grid";
import { TextField, Paper } from "@mui/material";
import { useState } from "react";
import { searchEndpoint } from "../api/searchEndpoint";

const columns = [
  {
    field: "id",
    headerName: "Symbol",
    minWidth: 60,
    flex: 0.1,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 170,
    flex: 0.5,
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 80,
    flex: 0.1,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    minWidth: 80,
    flex: 0.1,
  },
  {
    field: "currency",
    headerName: "Currency",
    minWidth: 80,
    flex: 0.1,
  },
];

export const DataTable = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        display: "flex",
        flexDirection: "column",
        height: 370,
      }}
    >
      <TextField
        sx={{ mb: 2 }}
        id="standard-basic"
        label="Search equity, crypto..."
        variant="standard"
        onChange={handleChange}
      />
      <DataGrid
        disableColumnMenu="true"
        hideFooterSelectedRowCount="true"
        density="compact"
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          bgcolor: "white",
          border: "none",
        }}
      />
    </Paper>
  );
};
