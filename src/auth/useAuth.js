import { useState, useEffect } from "react";
import { getCurrentUser } from "./getCurrentUser";
import { addAuthListener } from "./addAuthListener";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState(() => {
    const user = getCurrentUser();
    const isLoading = !user; //true when there is no user, false when user exists
    return { isLoading, user };
  });

  useEffect(() => {
    const unsubscribe = addAuthListener((user) => {
      setAuthInfo({ isLoading: false, user });
    });
    return unsubscribe; //function that is called automatically when components unmounts
  }, []);
  return authInfo;
};
