// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import CssBaseline from "@mui/material/CssBaseline";
import { customTheme } from "./settings/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import { Modal } from "./components/Modal";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route element={<Modal />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
