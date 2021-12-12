import { Navigate } from "react-router-dom";
import { useSession } from "../auth/UserProvider";

export const PrivateRoute = ({ children }) => {
  const { user } = useSession();
  if (user?.emailVerified === false) {
    return <Navigate to="/pending-verification" />;
  } else if (user?.emailVerified === true) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
};
