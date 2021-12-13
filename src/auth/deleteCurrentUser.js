import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";

export const deleteCurrentUser = async (
  user,
  currentPassword,
  setStatus,
  setMessage
) => {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
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
    setStatus(false);
  }
};
