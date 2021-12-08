import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

// Create a form that allows existing users to sign in using their email address and password. When a user completes the form, call the signInWithEmailAndPassword method:
export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(`successfully signed in as a: ${user}`);
      return {};
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Error signing in, error message: ${errorMessage}, error code: ${errorCode}`
      );
    });
};
