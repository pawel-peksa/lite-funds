import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#efefef",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand", //need to be imported!
    fontWeightLight: 500,
  },
});
