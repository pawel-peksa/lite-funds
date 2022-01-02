import { getCryptoValue } from "../api/cryptoApi";
import xirr from "xirr";
import getSymbolFromCurrency from "currency-symbol-map";

export const createAssets = async (arr, setAssets, setIsLoading) => {
  let uniqueSymbols = [
    ...new Set(arr.map((transaction) => transaction.symbol)),
  ];

  let assets = [];

  for (const symbol of uniqueSymbols) {
    let cryptoValueCall = await getCryptoValue(symbol);
    let price = Number(cryptoValueCall.price);
    let transactions = arr.filter(
      (transaction) => transaction.symbol === symbol
    );
    let name = transactions[0].product;
    let type = transactions[0].type;
    let sum = transactions
      .map((transaction) => transaction.qty)
      .reduce((a, b) => a + b);

    //CALCULATE P/L
    let buys = transactions
      .map((transaction) => transaction.price * transaction.qty)
      .reduce((a, b) => a + b);
    sum = sum.toFixed(4);
    let pl = (sum * price - buys).toFixed(1) + getSymbolFromCurrency("EUR");
    let plp = (((sum * price) / buys - 1) * 100).toFixed(1) + "%";

    //CALCULATE IRR
    let xirrData = transactions.map((transaction) => {
      return {
        amount: transaction.price * transaction.qty,
        when: transaction.date.toDate(),
      };
    });
    let simulateSell = {
      amount: sum * price * -1,
      when: new Date(),
    };
    xirrData.push(simulateSell);
    let irr = (xirr(xirrData) * 100).toFixed(2) + "%";

    //CREATE BUY SELL ARRAY FOR GLOBAL PORTOFLIO CALCS
    let buySell = [buys, price * sum];
    //CREATE LIST OF ASSETS
    assets.push({
      id: symbol,
      symbol,
      name,
      type,
      sum,
      buySell,
      price: price.toFixed(2) + getSymbolFromCurrency("EUR"),
      value: (price * sum).toFixed(2) + getSymbolFromCurrency("EUR"),
      xirrData,
      pl,
      plp,
      irr,
      transactions,
    });
  }
  console.log(assets);
  setAssets(assets);
  setIsLoading(false);
};
