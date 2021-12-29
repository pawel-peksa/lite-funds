import { Container, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSession } from "../auth/UserProvider";
import { getUserTransactions } from "../db/getUserTransactions";

const columns = [
  {
    field: "date",
    headerName: "Date",
    minWidth: 80,
    flex: 0.1,
  },
  {
    field: "id",
    headerName: "Symbol",
    minWidth: 70,
    flex: 0.1,
  },
  {
    field: "product",
    headerName: "Product",
    minWidth: 120,
    flex: 0.5,
  },
  {
    field: "buy",
    headerName: "Action",
    minWidth: 90,
    flex: 0.1,
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 70,
    flex: 0.15,
  },
  {
    field: "qty",
    headerName: "Qty",
    minWidth: 60,
    flex: 0.1,
  },
  {
    field: "commission",
    headerName: "Commission",
    minWidth: 120,
    flex: 0.1,
  },
  {
    field: "total",
    headerName: "Total",
    minWidth: 90,
    flex: 0.1,
  },
];

export const History = () => {
  const { user } = useSession();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTransactions(user, setRows, setIsLoading);
  }, [user]);
  return (
    <Container maxWidth="xl">
      <Paper
        sx={{
          p: 3,
          height: 800,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          color="primary.main"
          align="center"
          gutterBottom
        >
          Transaction History:
        </Typography>

        <DataGrid
          disableColumnMenu={true}
          autoHeight={true}
          autoPageSize={true}
          hideFooterSelectedRowCount={true}
          hideFooterPagination={true}
          density="compact"
          onRowClick={() => console.log("row click")}
          loading={isLoading}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[4]}
          pageSize={4}
          sx={{
            border: "none",
          }}
        />
      </Paper>
    </Container>
  );
};
