import { getFirestore, collection, getDocs } from "firebase/firestore";
import { createAssets } from "../functions/createAssets";
// import { format } from "date-fns";
// import getSymbolFromCurrency from "currency-symbol-map";

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

// let row = {
//   id: doc.id,
//   symbol: transaction.symbol,
//   product: transaction.product,
//   buy: transaction.buy === true ? "buy" : "sell",
//   price:
//     transaction.price.toFixed(2) +
//     getSymbolFromCurrency(transaction.currency),
//   qty: transaction.qty,
//   commission:
//     transaction.commission.toFixed(2) +
//     getSymbolFromCurrency(transaction.currency),
//   total:
//     (
//       transaction.price * transaction.qty +
//       transaction.commission
//     ).toFixed(2) + getSymbolFromCurrency(transaction.currency),
//   date: format(transaction.date.toDate(), "dd-MM-yyyy"),
// };
// rows.push(row);
