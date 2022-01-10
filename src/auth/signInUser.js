import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export const signInUser = (
  { email, password },
  navigate,
  setIsLoading,
  setWrongCredentials
) => {
  if (typeof setIsLoading !== "undefined") setIsLoading(true);
  if (typeof setWrongCredentials !== "undefined") setWrongCredentials("");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsLoading(false);
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        if (typeof setWrongCredentials !== "undefined")
          setWrongCredentials("Wrong Password");
      } else if (errorCode === "auth/user-not-found") {
        if (typeof setWrongCredentials !== "undefined")
          setWrongCredentials("Account does not exist. Please Sign Up");
      } else {
        if (typeof setWrongCredentials !== "undefined")
          setWrongCredentials(errorMessage);
      }
      if (typeof setIsLoading !== "undefined") setIsLoading(false);
    });
};
