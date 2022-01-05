import { Typography, Box, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import getSymbolFromCurrency from "currency-symbol-map";

export const TableOfAssets = ({ assets, isLoading }) => {
  const columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 60,
      flex: 0.05,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 70,
      flex: 0.2,
    },
    {
      field: "sum",
      headerName: "Amount",
      minWidth: 70,
      flex: 0.1,
      valueFormatter: (params) => {
        let formattedValue = Number(params.value);
        return formattedValue;
      },
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      flex: 0.1,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted}${getSymbolFromCurrency("EUR")}`;
      },
    },
    // {
    //   field: "irr",
    //   headerName: "IRR",
    //   minWidth: 70,
    //   flex: 0.15,
    // },
    {
      field: "value",
      headerName: "Value",
      minWidth: 70,
      flex: 0.15,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted}${getSymbolFromCurrency("EUR")}`;
      },
    },
    {
      field: "pl",
      headerName: "P/L",
      minWidth: 60,
      flex: 0.15,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted}${getSymbolFromCurrency("EUR")}`;
      },
      cellClassName: (params) => {
        return params.value < 0 ? "loss" : "profit";
      },
    },
    {
      field: "plp",
      headerName: "P/L %",
      minWidth: 60,
      flex: 0.15,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value * 100).toLocaleString();
        return `${valueFormatted}%`;
      },
      cellClassName: (params) => {
        return params.value < 0 ? "loss" : "profit";
      },
    },
  ];

  return (
    <Box
      sx={{
        "& .loss": {
          color: "red",
          fontWeight: "500",
        },
        "& .profit": {
          color: "teal",
          fontWeight: "500",
        },
      }}
    >
      <Typography
        variant="h4"
        component="div"
        color="primary.main"
        align="center"
        gutterBottom
        sx={{ mt: 2, fontSize: 30, mb: 2 }}
      >
        Your assets:
      </Typography>

      {isLoading ? (
        <Skeleton variant="rectangular" height={400} />
      ) : (
        <DataGrid
          disableColumnMenu={true}
          autoHeight={true}
          autoPageSize={true}
          disableSelectionOnClick
          hideFooterSelectedRowCount={true}
          density="compact"
          onRowClick={() => console.log("row click")}
          loading={isLoading}
          rows={assets}
          columns={columns}
          rowsPerPageOptions={[10]}
          pageSize={10}
          sx={{
            border: "none",
          }}
        />
      )}
    </Box>
  );
};
