import { getAuth } from "firebase/auth";
const auth = getAuth();

export const getCurrentUser = () => {
  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
    return {};
  } else {
    return null;
  }
};
