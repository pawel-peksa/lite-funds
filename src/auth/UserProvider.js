import { createContext, useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession({ user, loading: false });
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && children}
    </UserContext.Provider>
  );
};

//customHook to allow other components to access the user context
export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
