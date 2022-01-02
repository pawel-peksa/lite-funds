export const calculateProfitLoss = (assets) => {
  if (assets.length === 0) return;

  let balance = assets.map((asset) => asset.buySell[1]).reduce((a, b) => a + b);
  let buys = assets.map((asset) => asset.buySell[0]).reduce((a, b) => a + b);
  return balance - buys;
};
