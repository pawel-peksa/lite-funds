import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

// Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:
export const createUser = (
  { email, password },
  navigate,
  setUserExists,
  setIsLoading
) => {
  const auth = getAuth();
  setUserExists(false);
  setIsLoading(true);

  fetchSignInMethodsForEmail(auth, email) //check if email exists in database
    .then((data) => {
      if (data.length > 0) {
        setIsLoading(false);
        setUserExists(true);
      }
    })
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
          // console.log(user);
        })
        .then(() => {
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log("errorCode", error.code);
        });
    })
    .catch((error) => {
      console.log("errorCode", error.code);
    });
};
