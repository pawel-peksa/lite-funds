import { useState, useEffect } from "react";
import { getCurrentUser } from "./getCurrentUser";
import { addAuthListener } from "./addAuthListener";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState(getCurrentUser());

  useEffect(() => {
    const unsubscribe = addAuthListener((user) => {
      setAuthInfo(user);
    });
    return () => unsubscribe(); //unsubscribe when components unmounts
  }, []); //add Event Listener only when component mounts
  return authInfo;
};
