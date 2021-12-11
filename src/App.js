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
import { UserProvider } from "./auth/UserProvider";
// do usunięcia
//import { addAuthListener } from "./auth/addAuthListener";
//import { getCurrentUser } from "./auth/getCurrentUser";

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
            <Route element={<SignInSignUpContainer />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </UserProvider>
  );
};

export default App;
