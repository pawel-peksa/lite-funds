import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore();

export const addUserToDB = async (user) => {
  //get reference to firestore document
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("User istnieje", docSnap.data());
  } else {
    const userInfo = { currency: "EUR", uid: user.uid };
    try {
      await setDoc(userRef, userInfo);
    } catch (error) {
      console.log(error);
    }
  }
};
