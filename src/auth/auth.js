import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
const auth = getAuth();

// Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:
export const createUser = ({ email, password }) => {
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

// // Create a form that allows existing users to sign in using their email address and password. When a user completes the form, call the signInWithEmailAndPassword method:
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// // For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. This observer gets called whenever the user's sign-in state changes.
// // Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
