import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, isAuthed }) => {
  return isAuthed ? children : <Navigate to="/sign-in" />;
};
