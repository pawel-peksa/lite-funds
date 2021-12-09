import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:
export const createUser = ({ email, password }) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("zalogowano");
      console.log("userCredential", userCredential);
      console.log("user", userCredential.user);
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("errorCode", error.code);
      console.log("errorMessage", error.message);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
    });
};
