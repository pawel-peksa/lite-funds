// import yahooFinance from "yahoo-finance2";
// const yahooFinance = require("yahoo-finance2").default;
var yahooFinance = require("yahoo-finance");

// const httpRequestOptions = {
//   proxy: "https://lite-funds-proxy.herokuapp.com",
// };

export const yFinance = async () => {
  // const results = await yahooFinance.search(
  //   "AAPL",
  //   {},
  //   {
  //     fetchOptions: { proxy: "https://lite-funds-proxy.herokuapp.com/" },
  //   }
  // );
  // console.log(results);
  // const query = "GOO";
  // const queryOpts = { lang: "en-US" };
  // const results = await yahooFinance.module(
  //   query,
  //   queryOpts,
  //   httpRequestOptions
  // );

  yahooFinance.quote(
    {
      symbol: "TSLA",
      modules: ["price"], // ex: ['price', 'summaryDetail']
    },
    function (err, snapshot) {
      console.log(snapshot);
    }
  );
  // fetch(
  //   "https://lite-funds-proxy.herokuapp.com/https://finance.yahoo.com/quote/AAPL/history"
  // ).then((resp) => console.log(resp));
};
