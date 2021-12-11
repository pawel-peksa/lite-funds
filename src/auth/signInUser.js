import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export const signInUser = (
  { email, password },
  navigate,
  setIsLoading,
  setWrongCredentials
) => {
  setIsLoading(true);
  setWrongCredentials("");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsLoading(false);
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        setWrongCredentials("Wrong Password");
      } else if (errorCode === "auth/user-not-found") {
        setWrongCredentials("Account does not exist. Please Sign Up");
      } else {
        setWrongCredentials(errorMessage);
      }
      setIsLoading(false);
    });
};
