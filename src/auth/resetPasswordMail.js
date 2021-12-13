import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export const resetPasswordMail = (
  email,
  setStatus,
  setMessage,
  setIsLoading
) => {
  setIsLoading(true);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setStatus("ok");
      setMessage(
        "We have sent you an email with instructions on how to reset your password"
      );
      setIsLoading(false);
    })
    .catch((error) => {
      setStatus("error");
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setMessage("Account does not exist. Please Sign Up");
      } else {
        setMessage(error.message);
      }
      setIsLoading(false);
    });
};
