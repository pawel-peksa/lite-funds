import {
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";

export const changePassword = async (
  user,
  currentPassword,
  newPassword,
  setStatus,
  setMessage,
  setIsLoading
) => {
  setIsLoading(true);
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    setIsLoading(false);
    setStatus(true);
    setMessage("Password has been changed");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === "auth/wrong-password") {
      setMessage("Wrong Password");
    } else {
      setMessage(errorMessage);
    }
    setIsLoading(false);
    setStatus(false);
  }
};
