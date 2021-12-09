import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HistoryIcon from "@mui/icons-material/History";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const BottomNav = () => {
  const [value, setValue] = useState("portfolio");

  const handleChange = (e, newValue) => {
    e.preventDefault();
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Portfolio"
          value="portfolio"
          icon={<AccountBalanceWalletOutlinedIcon />}
        />
        <BottomNavigationAction
          label="History"
          value="history"
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          label="Wallets"
          value="wallets"
          icon={<DonutSmallOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Account"
          value="account"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
