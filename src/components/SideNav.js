import { signOutUser } from "../auth/signOutUser";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import { useSession } from "../auth/UserProvider";
import { ifEmailProvider } from "../auth/ifEmailProvider";

export const SideNav = ({ setShow }) => {
  const { user } = useSession();
  const icons = [
    <AccountBalanceWalletOutlinedIcon />,
    <PaidOutlinedIcon />,
    <HistoryIcon />,
    <TrendingUpIcon
      sx={{ borderBottom: 2, borderLeft: 2, borderColor: "primary.main" }}
    />,
    <PriceChangeOutlinedIcon />,
  ];
  return (
    <Drawer
      sx={{
        width: 70,
        flexShrink: 0,
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

        {["Portfolio", "Transaction", "History", "Stocks", "Crypto"].map(
          (text, index) => (
            <ListItemButton
              onClick={() => setShow(text.toLowerCase())}
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
          onClick={() => setShow("account")}
          sx={{
            flexDirection: "column",
          }}
        >
          <ListItemIcon
            sx={{ justifyContent: "center", color: "primary.main" }}
          >
            {ifEmailProvider(user) ? (
              <AccountCircleIcon fontSize="large" />
            ) : (
              <Avatar
                sx={{ margin: "0 auto" }}
                alt={user.displayName}
                src={user.photoURL}
              />
            )}
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
