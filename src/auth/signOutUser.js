import { getAuth, signOut } from "firebase/auth";

export const signOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log("error happened", error);
    });
};
