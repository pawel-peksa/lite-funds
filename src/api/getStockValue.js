var yahooFinance = require("yahoo-finance");

export const getStockValue = async (symbol, currency) => {
  let regularMarketPrice = await yahooFinance.quote({
    symbol: symbol,
    modules: ["price"],
  });
  return regularMarketPrice.price.regularMarketPrice;
};
