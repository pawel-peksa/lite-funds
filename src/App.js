import "./settings/firebaseConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { PendingVerification } from "./pages/PendingVerification";
import { Dashboard } from "./pages/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import { customTheme } from "./settings/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import { SignInSignUpContainer } from "./components/SignInSignUpContainer";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserProvider } from "./auth/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/pending-verification"
              element={<PendingVerification />}
            />
            <Route element={<SignInSignUpContainer />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </ThemeProvider>
      </Router>
    </UserProvider>
  );
};

export default App;
