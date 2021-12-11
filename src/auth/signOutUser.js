import { getAuth, signOut } from "firebase/auth";

export const signOutUser = () => {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.log("error happened", error.message);
  });
};
