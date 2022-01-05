import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();

export const addTransaction = async (
  user,
  type,
  symbol,
  currency,
  date,
  price,
  qty,
  commission,
  comments,
  product,
  setIsLoading
) => {
  setIsLoading(true);
  const transactionsRef = collection(db, "users", user.uid, "transactions");

  await addDoc(transactionsRef, {
    type,
    symbol,
    currency,
    date,
    price,
    qty,
    commission,
    comments,
    product,
  });
  setIsLoading(false);
};
