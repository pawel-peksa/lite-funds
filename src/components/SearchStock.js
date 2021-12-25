import {
  TextField,
  List,
  Box,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { searchEndpoint } from "../api/searchEndpoint";
import SearchIcon from "@mui/icons-material/Search";

const MyList = ({ results, setSelected, setCurrency }) => {
  const handleSelect = (e, symbol, currency) => {
    setSelected(symbol);
    setCurrency(currency);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: 150,
        maxWidth: 450,
        alignSelf: "center",
        overflow: "auto",
      }}
    >
      <List height={150} width={360} dense sx={{ padding: 0 }}>
        {!!results &&
          results.map((result) => {
            return (
              <ListItem
                key={result["1. symbol"]}
                disablePadding
                component="div"
              >
                <ListItemButton
                  divider
                  onClick={(e) =>
                    handleSelect(e, result["1. symbol"], result["8. currency"])
                  }
                >
                  <ListItemText
                    primary={`[${result["1. symbol"]}] ${result["2. name"]} - ${result["4. region"]} - ${result["8. currency"]}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export const SearchStock = ({
  selected,
  setSelected,
  results,
  setResults,
  setCurrency,
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
      <MyList
        results={results}
        setSelected={setSelected}
        setCurrency={setCurrency}
      />
      {selected && (
        <Typography
          align="center"
          color="primary.main"
          sx={{ fontSize: 18, mt: 3 }}
        >
          [{selected}]{" "}
          {results.find((obj) => obj["1. symbol"] === selected)["2. name"]} -{" "}
          {results.find((obj) => obj["1. symbol"] === selected)["4. region"]} (
          {results.find((obj) => obj["1. symbol"] === selected)["8. currency"]})
        </Typography>
      )}
    </>
  );
};
