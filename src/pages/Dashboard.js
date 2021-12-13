import { Box, Container } from "@mui/material";
import { Copyright } from "../components/Copyright";
import { SideNav } from "../components/SideNav";
import { BottomNav } from "../components/BottomNav";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileTitle } from "../components/MobileTitle";
import { useTheme } from "@mui/material/styles";
import { Portfolio } from "./Portfolio";
import { Account } from "./Account";
import { useState } from "react";

export const Dashboard = () => {
  const [show, setShow] = useState("portfolio");
  const theme = useTheme();
  const sideNavigation = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
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
          {show === "account" && <Account />}

          <Copyright color="primary.main" />
        </Container>
      </Box>
      {sideNavigation ? (
        <SideNav setShow={setShow} />
      ) : (
        <BottomNav setShow={setShow} />
      )}
    </>
  );
};
