// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import CssBaseline from "@mui/material/CssBaseline";
import customTheme from "./settings/customTheme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <CssBaseline>
      <ThemeProvider theme={customTheme}>
        <SignIn />
      </ThemeProvider>
    </CssBaseline>
    // <Router>
    //   <Routes>
    //     <Route path="/sign-in" element={<SignIn />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
