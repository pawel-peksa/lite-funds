import { TextField, Box, Typography, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
// import { searchEndpoint } from "../api/searchEndpoint"; ALPHA VANTAGE API
import { yFinanceSearchEndpoint, yFinanceQuote } from "../api/yFinance";
import SearchIcon from "@mui/icons-material/Search";
import getSymbolFromCurrency from "currency-symbol-map";
import NumberFormat from "react-number-format";
import Skeleton from "@mui/material/Skeleton";

const MyTable = ({
  results,
  setSymbol,
  setCurrency,
  setProduct,
  setCurrentValue,
  setCurrentVolume,
  setShowCurrency,
  setFetchingStockInfo,
}) => {
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
      field: "currency",
      headerName: "Region",
      minWidth: 70,
      flex: 0.15,
    },
    {
      field: "region",
      headerName: "Exchange",
      minWidth: 50,
      flex: 0.1,
    },
  ];

  let rows;
  if (typeof results === "undefined") {
    rows = [];
  } else {
    // IMPLEMENTATION FOR SEARCH ENDPOINT USING YAHOO_FINANCE_2
    let filtered = results.filter(
      (result) => result.quoteType === "EQUITY" || result.quoteType === "ETF"
    );
    rows = filtered.map((result) => {
      return {
        id: result.symbol,
        name: result.shortname,
        type: result.typeDisp,
        region: result.exchange,
        currency: result.exchDisp,
      };
      // IMPLEMENTATION FOR SEARCH ENDPOINT USING ALPHA VANTAGE API
      // rows = results.map((result) => {
      //   return {
      //     id: result["1. symbol"],
      //     name: result["2. name"],
      //     type: result["3. type"],
      //     region: result["4. region"],
      //     currency: result["8. currency"],
      //   };
    });
  }
  const onRowClick = (row) => {
    setSymbol(row.row.id);
    setProduct(row.row.name);
    yFinanceQuote(
      row.row.id,
      setCurrentValue,
      setCurrentVolume,
      setShowCurrency,
      setFetchingStockInfo,
      setCurrency
    );
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
  const [fetchingStockInfo, setFetchingStockInfo] = useState(false);
  const [search, setSearch] = useState("");
  const [currentValue, setCurrentValue] = useState();
  const [currentVolume, setCurrentVolume] = useState();
  const [showCurrency, setShowCurrency] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    // searchEndpoint(search, setResults, setIsLoading);
    yFinanceSearchEndpoint(search, setResults, setIsLoading);
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
          label="Name, symbol, ISIN..."
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
          setCurrentValue={setCurrentValue}
          setCurrentVolume={setCurrentVolume}
          setShowCurrency={setShowCurrency}
          setFetchingStockInfo={setFetchingStockInfo}
        />
      </Box>
      {/* ALPHA VANTAGE API */}
      {/* {results?.length > 0 &&
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
        )} */}
      {/* YAHOO FINANCE */}
      {symbol && results.find((obj) => obj.symbol === symbol) && (
        <>
          <Typography align="center" color="primary.main" sx={{ fontSize: 18 }}>
            {symbol} - {results.find((obj) => obj.symbol === symbol).longname} (
            {results.find((obj) => obj.symbol === symbol).exchange})
          </Typography>
          {fetchingStockInfo ? (
            <Skeleton variant="text" />
          ) : (
            <Typography align="center" variant="body1">
              Price:{" "}
              <span style={{ color: "teal" }}>
                {currentValue}
                {getSymbolFromCurrency(showCurrency)}
              </span>{" "}
            </Typography>
          )}
          {fetchingStockInfo ? (
            <Skeleton variant="text" />
          ) : (
            <>
              <Typography align="center" variant="body2" sx={{ mb: 2 }}>
                Volume:{" "}
                <span style={{ color: "teal" }}>
                  <NumberFormat
                    thousandSeparator={true}
                    value={currentVolume}
                    displayType={"text"}
                  />
                  {getSymbolFromCurrency(showCurrency)}
                </span>
              </Typography>
              <Divider />
            </>
          )}
        </>
      )}
    </>
  );
};
