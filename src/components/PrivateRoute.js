import { Navigate } from "react-router-dom";
import { useSession } from "../auth/UserProvider";

export const PrivateRoute = ({ children }) => {
  const { user } = useSession();
  return user ? children : <Navigate to="/sign-in" />;
};
