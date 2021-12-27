import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const logInWithGoogle = () => signInWithRedirect(auth, provider);
