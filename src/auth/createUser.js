import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";

import { addUserToDB } from "../db/addUserToDB";
// Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:
export const createUser = async (
  { email, password },
  setUserExists,
  setIsLoading,
  setUserCreated
) => {
  const auth = getAuth();
  setUserExists(false);
  setIsLoading(true);

  try {
    const loginMethods = await fetchSignInMethodsForEmail(auth, email);
    //check if email exists in database
    if (loginMethods.length > 0) {
      setIsLoading(false);
      setUserExists(true);
    }

    //create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //Add user to DB
    await addUserToDB(userCredential.user);
    //Send mail to confirm email address
    await sendEmailVerification(userCredential.user);

    setIsLoading(false);
    setUserCreated(true);
  } catch (error) {
    console.log("errorCode", error.code);
    setIsLoading(false);
  }
};
