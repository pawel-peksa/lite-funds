import { Container, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useSession } from "../auth/UserProvider";
import { getUserTransactions } from "../db/getUserTransactions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTransaction } from "../db/deleteTransaction";

export const History = () => {
  const { user } = useSession();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getUserTransactions(user, setRows, setIsLoading);

    return unsubscribe;
  }, [user]);

  const columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 80,
      flex: 0.1,
    },
    {
      field: "symbol",
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
      minWidth: 90,
      flex: 0.1,
    },
    {
      field: "total",
      headerName: "Total",
      minWidth: 90,
      flex: 0.1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteOutlineIcon sx={{ color: "darkred" }} />}
          onClick={() => deleteTransaction(user, params.id)}
          label="Delete"
        />,
      ],
      minWidth: 40,
      flex: 0.05,
    },
  ];

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
          disableSelectionOnClick
          hideFooterSelectedRowCount={true}
          // hideFooterPagination={true}
          // density="compact"
          onRowClick={() => console.log("row click")}
          loading={isLoading}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10]}
          pageSize={10}
          sx={{
            border: "none",
          }}
        />
      </Paper>
    </Container>
  );
};
