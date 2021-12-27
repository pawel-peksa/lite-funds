import { getAuth, getRedirectResult } from "firebase/auth";
import { addUserToDB } from "../db/addUserToDB";
const auth = getAuth();

export const getUserFromRedirect = () => {
  getRedirectResult(auth)
    .then((result) => {
      const user = result.user;
      addUserToDB(user);
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log("errorCode", errorCode);
      // console.log("errorMessage", errorMessage);
    });
};
