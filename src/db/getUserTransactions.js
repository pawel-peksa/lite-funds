import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { format } from "date-fns";
import getSymbolFromCurrency from "currency-symbol-map";

const db = getFirestore();

export const getUserTransactions = async (user, setRows, setIsLoading) => {
  const transactionsRef = collection(db, "users", user.uid, "transactions");

  const q = query(transactionsRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let rows = [];
    querySnapshot.forEach((doc) => {
      let transaction = doc.data();
      let row = {
        id: doc.id,
        symbol: transaction.symbol,
        product: transaction.product,
        type: transaction.type,
        price:
          transaction.price.toFixed(2) +
          getSymbolFromCurrency(transaction.currency),
        qty: transaction.qty,
        commission:
          transaction.commission.toFixed(2) +
          getSymbolFromCurrency(transaction.currency),
        total:
          (
            transaction.price * transaction.qty +
            transaction.commission
          ).toFixed(2) + getSymbolFromCurrency(transaction.currency),
        date: format(transaction.date.toDate(), "dd-MM-yyyy"),
        comment: transaction.comments,
      };
      rows.push(row);
    });
    setRows(rows);
    setIsLoading(false);
  });

  return unsubscribe;
};
