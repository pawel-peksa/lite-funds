import { signOutUser } from "../auth/signOutUser";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const SideNav = () => {
  const icons = [
    <AccountBalanceWalletOutlinedIcon />,
    <PaidOutlinedIcon />,
    <HistoryIcon />,
    <DonutSmallOutlinedIcon />,
    <TrendingUpIcon
      sx={{ borderBottom: 2, borderLeft: 2, borderColor: "primary.main" }}
    />,
  ];
  return (
    <Drawer
      sx={{
        width: 70,
        flexShrink: 0,
        // "& .MuiDrawer-paper": {
        //   width: drawerWidth,
        //   boxSizing: "border-box",
        // },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        variant="body1"
        component="h1"
        align="center"
        color="primary.main"
        sx={{ mt: 3, pt: 1, pb: 1, mb: 1, fontWeight: 500 }}
      >
        Lite Funds
      </Typography>
      <List>
        {/* <Divider component="li" /> */}

        {["Portfolio", "Transaction", "History", "Wallets", "Market"].map(
          (text, index) => (
            <ListItemButton
              key={text}
              sx={{
                flexDirection: "column",
              }}
            >
              <ListItemIcon
                sx={{ justifyContent: "center", color: "primary.main" }}
              >
                {icons[index]}
              </ListItemIcon>

              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontSize: 13, fontWeight: "medium" }}
              />
            </ListItemButton>
          )
        )}
        {/* <Divider component="li" /> */}
      </List>
      <List sx={{ mt: "auto", pb: 0 }}>
        {/* <Divider component="li" /> */}

        <ListItemButton
          sx={{
            flexDirection: "column",
          }}
        >
          <ListItemIcon
            sx={{ justifyContent: "center", color: "primary.main" }}
          >
            <AccountCircleIcon fontSize="large" />
          </ListItemIcon>

          <ListItemText
            primary="Account"
            primaryTypographyProps={{ fontSize: 13, fontWeight: "medium" }}
          />
        </ListItemButton>
        <Divider component="li" />

        <ListItemButton
          onClick={signOutUser}
          sx={{
            flexDirection: "column",
          }}
        >
          <ListItemIcon
            sx={{ justifyContent: "center", color: "primary.main" }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Log out"
            primaryTypographyProps={{ fontSize: 13, fontWeight: "medium" }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
