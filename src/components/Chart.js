import { DataGrid } from "@mui/x-data-grid";
import { TextField, Paper } from "@mui/material";
import { useState } from "react";

export const Chart = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 370,
      }}
    ></Paper>
  );
};
