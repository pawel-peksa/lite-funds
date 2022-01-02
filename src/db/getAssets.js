import { getFirestore, collection, getDocs } from "firebase/firestore";
import { createAssets } from "../functions/createAssets";

const db = getFirestore();

export const getAssets = async (user, setAssets, setIsLoading) => {
  const transactionsRef = collection(db, "users", user.uid, "transactions");
  const querySnapshot = await getDocs(transactionsRef);

  let transactions = [];

  querySnapshot.forEach((doc) => {
    let transaction = doc.data();
    transactions.push(transaction);
  });
  createAssets(transactions, setAssets, setIsLoading);
};
