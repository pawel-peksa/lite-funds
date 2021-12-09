import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:
export const createUser = ({ email, password }, navigate) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("zalogowano");
      // const user = userCredential.user;
    })
    .then(() => {
      navigate("/dashboard");
    })
    .catch((error) => {
      console.log("errorCode", error.code);
      console.log("errorMessage", error.message);
    });
};
