import { getFirestore, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore();

export const deleteTransaction = async (user, id) => {
  const transactionRef = doc(db, "users", user.uid, "transactions", id);

  await deleteDoc(transactionRef);
};
