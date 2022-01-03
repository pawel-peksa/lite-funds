import { Typography } from "@mui/material";
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
    },
  ];

  return (
    <>
      <Typography
        variant="h5"
        component="div"
        color="primary.main"
        align="center"
        gutterBottom
      >
        Your assets:
      </Typography>

      <DataGrid
        disableColumnMenu={true}
        autoHeight={true}
        autoPageSize={true}
        disableSelectionOnClick
        hideFooterSelectedRowCount={true}
        // hideFooterPagination={true}
        density="compact"
        onRowClick={() => console.log("row click")}
        loading={isLoading}
        rows={assets}
        columns={columns}
        rowsPerPageOptions={[6]}
        pageSize={6}
        sx={{
          border: "none",
        }}
      />
    </>
  );
};
