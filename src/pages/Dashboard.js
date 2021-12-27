import { Box, Container } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { SideNav } from "../components/SideNav";
import { BottomNav } from "../components/BottomNav";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileTitle } from "../components/MobileTitle";
import { useTheme } from "@mui/material/styles";
import { Portfolio } from "./Portfolio";
import { Account } from "./Account";
import { Market } from "./Market";
import { Crypto } from "./Crypto";
import { Transaction } from "./Transaction";
import { useState, useEffect } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getUserFromRedirect } from "../auth/getUserFromRedirect";

export const Dashboard = () => {
  const [show, setShow] = useState("portfolio");
  const theme = useTheme();
  const sideNavigation = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    getUserFromRedirect();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {!sideNavigation && <MobileTitle />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          height: sideNavigation ? "100vh" : "calc(100vh-62px)",
          ml: sideNavigation ? "102px" : "",
          mt: sideNavigation ? "" : "22px",
          mb: sideNavigation ? "" : "40px",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            pl: sideNavigation ? null : 1,
            pr: sideNavigation ? null : 1,
            pt: 3,
            pb: 3,
          }}
        >
          {show === "portfolio" && <Portfolio />}
          {show === "stocks" && <Market />}
          {/* TODO change name of the Market compoenent and file to Stocks */}
          {show === "crypto" && <Crypto />}
          {show === "account" && <Account />}
          {show === "transaction" && <Transaction />}

          <Copyright color="primary.main" />
        </Container>
      </Box>
      {sideNavigation ? (
        <SideNav setShow={setShow} />
      ) : (
        <BottomNav setShow={setShow} />
      )}
    </LocalizationProvider>
  );
};
