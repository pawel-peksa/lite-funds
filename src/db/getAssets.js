import { getFirestore, collection, getDocs } from "firebase/firestore";
import { createAssets } from "../functions/createAssets";

const db = getFirestore();

export const getAssets = async (
  user,
  setAssets,
  setIsLoading,
  setEmptyAssets
) => {
  const transactionsRef = collection(db, "users", user.uid, "transactions");
  const querySnapshot = await getDocs(transactionsRef);

  let transactions = [];

  querySnapshot.forEach((doc) => {
    let transaction = doc.data();
    transactions.push(transaction);
  });

  if (transactions.length === 0) {
    setEmptyAssets(true);
    setIsLoading(false);
  } else {
    createAssets(transactions, setAssets, setIsLoading);
    setEmptyAssets(false);
  }
};
