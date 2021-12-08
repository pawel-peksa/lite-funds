import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log("error happened", error);
    });
};
