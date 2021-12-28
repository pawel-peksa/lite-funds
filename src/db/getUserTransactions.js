import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import fromUnixTime from "date-fns/fromUnixTime";
const db = getFirestore();

export const getUserTransactions = async (user, setRows, setIsLoading) => {
  const transactionsRef = collection(db, "users", user.uid, "transactions");

  const q = query(transactionsRef);

  const querySnapshot = await getDocs(q);

  let rows = [];
  querySnapshot.forEach((doc) => {
    let transaction = doc.data();
    let row = {
      id: transaction.symbol,
      type: transaction.type,
      buy: transaction.buy === true ? "buy" : "sell",
      price: transaction.price,
      currency: transaction.currency,
      qty: transaction.qty,
      commission: transaction.commission,
      date: fromUnixTime(transaction.date),
    };
    rows.push(row);
  });
  setRows(rows);
  setIsLoading(false);
};
