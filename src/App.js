import "./settings/firebaseConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import { customTheme } from "./settings/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import { SignInSignUpContainer } from "./components/SignInSignUpContainer";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./auth/useAuth";

const App = () => {
  const isAuthed = useAuth();
  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthed={!!isAuthed}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route element={<SignInSignUpContainer />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
