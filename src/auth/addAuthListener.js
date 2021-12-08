import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

//
export const addAuthListener = (callback) => {
  //normally onAuthStateChanged calls the callback that we provide with user obj(when just logged in) or null (when just logged out)
  //add sort of "intermediate" callback that we pass to onAuthStateChanged function which takes user obj and pass only the relevant parts of it to our callback function
  const onChange = (user) => {
    if (user) {
      callback({}); //for now empty, to be expanded when more properties needed
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      callback(null); //to signify that there is no current user
    }
  };
  return onAuthStateChanged(auth, onChange);
};
