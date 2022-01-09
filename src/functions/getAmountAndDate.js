import {
  format,
  parseISO,
  getUnixTime,
  differenceInCalendarDays,
  addDays,
} from "date-fns";
export const getAmountAndDate = (assets) => {
  //get transactions
  let amountAndDate = [];
  assets.forEach((asset) => {
    let assetAmountAndDate = [];
    asset.transactions.forEach((transaction) => {
      let singleTransaction = {
        date: format(transaction.date.toDate(), "yyyy-MM-dd"),
        amount: transaction.qty,
      };
      assetAmountAndDate.push(singleTransaction);
    });

    //create all days with cumulative amount owned by user
    //sort days from earliest to latest
    let dates = assetAmountAndDate.map((st) => st.date);
    dates.sort(
      (a, b) =>
        getUnixTime(parseISO(a, "yyyy-MM-dd")) -
        getUnixTime(parseISO(b, "yyyy-MM-dd"))
    );

    //if more than one transaction on the same day, sum up these values!
    // console.log(assetAmountAndDate);

    let reducedAssetAmountAndDate = Object.values(
      assetAmountAndDate.reduce((a, { date, amount }) => {
        a[date] = a[date] || { date, amount: 0 };
        a[date].amount = a[date].amount + amount;
        return a;
      }, {})
    );

    // console.log(reducedAssetAmountAndDate);
    //start from day 1, go to current day and calc cumulative qty
    let daysFromNow = differenceInCalendarDays(new Date(), parseISO(dates[0]));
    let amount = 0;
    let allDays = [];
    for (let i = 0; i <= daysFromNow; i++) {
      let date = format(addDays(parseISO(dates[0]), i), "yyyy-MM-dd");
      if (reducedAssetAmountAndDate.find((obj) => obj.date === date)) {
        amount =
          amount +
          reducedAssetAmountAndDate.find((obj) => obj.date === date).amount;
      }
      let day = {
        date,
        amount,
      };
      allDays.push(day);
    }

    let newObj = {
      name: asset.name,
      days: allDays,
    };
    amountAndDate.push(newObj);
  });

  return amountAndDate;
};
