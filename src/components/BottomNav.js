import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

export const BottomNav = ({ setShow, show }) => {
  const handleChange = (e, newValue) => {
    e.preventDefault();
    console.log(newValue);
    setShow(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={show} onChange={handleChange}>
        <BottomNavigationAction
          label="Portfolio"
          value="portfolio"
          icon={<AccountBalanceWalletOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Transaction"
          value="transaction"
          icon={<PaidOutlinedIcon />}
        />
        <BottomNavigationAction
          label="History"
          value="history"
          icon={<HistoryIcon />}
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
