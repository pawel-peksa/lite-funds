import { getCryptoValue } from "../api/cryptoApi2";
import { cryptoList } from "../api/cryptoList";
import { yFinanceQuote } from "../api/yFinance";

export const createAssets = async (arr, setAssets, setIsLoading) => {
  let assets = [];

  //gather crypto
  let symbolsCrypto = arr.filter(
    (transaction) => transaction.type === "crypto"
  );
  let uniqueSymbolsCrypto = [
    ...new Set(symbolsCrypto.map((transaction) => transaction.symbol)),
  ];
  for (const symbol of uniqueSymbolsCrypto) {
    let currency = cryptoList.find((crypto) => {
      return crypto.symbol === symbol.toLowerCase();
    });
    let id = currency.id;
    let price = await getCryptoValue(id, "eur");
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
    let pl = Number((sum * price - buys).toFixed(1));
    let plp = Number(((sum * price) / buys - 1).toFixed(3));

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
    let irr = 1;
    // try {
    //   irr = (xirr(xirrData) * 100).toFixed(2) + "%";
    // } catch (error) {
    //   irr = -0.9;
    //   console.log(error);
    // }

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
      price: Number(price.toFixed(2)),
      value: Number((price * sum).toFixed(2)),
      xirrData,
      pl,
      plp,
      irr,
      transactions,
    });
  }
  //gather stocks
  let symbolsStocks = arr.filter(
    (transaction) => transaction.type === "stocks"
  );
  let uniqueSymbolsStocks = [
    ...new Set(symbolsStocks.map((transaction) => transaction.symbol)),
  ];
  for (const symbol of uniqueSymbolsStocks) {
    let price = await yFinanceQuote(symbol);
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
    let pl = Number((sum * price - buys).toFixed(1));
    let plp = Number(((sum * price) / buys - 1).toFixed(3));

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
    let irr = 1;
    // try {
    //   irr = (xirr(xirrData) * 100).toFixed(2) + "%";
    // } catch (error) {
    //   irr = -0.9;
    //   console.log(error);
    // }

    //CREATE BUY SELL ARRAY FOR GLOBAL PORTOFLIO CALCS
    let buySell = [buys, price * sum];
    // CREATE LIST OF ASSETS
    assets.push({
      id: symbol,
      symbol,
      name,
      type,
      sum,
      buySell,
      price: Number(price.toFixed(2)),
      value: Number((price * sum).toFixed(2)),
      xirrData,
      pl,
      plp,
      irr,
      transactions,
    });
  }

  setAssets(assets);
  setIsLoading(false);
};
