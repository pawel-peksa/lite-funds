import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore();

export const addUserToDB = async (user) => {
  //get reference to firestore document
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
  } else {
    const userInfo = { currency: "EUR", uid: user.uid };
    try {
      await setDoc(userRef, userInfo);
    } catch (error) {
      console.log(error);
    }
  }
};
