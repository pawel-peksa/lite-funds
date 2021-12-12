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
  setMessage
) => {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    setStatus(true);
    setMessage("Password has been changed");
  } catch (error) {
    console.log(user);
    setStatus(false);
    setMessage(error.message);
  }
};
