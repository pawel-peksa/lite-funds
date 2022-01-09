import { yFinanceFetchStock } from "../api/yFinance";
import { parseISO, format, differenceInCalendarDays, addDays } from "date-fns";
import { getAmountAndDate } from "../functions/getAmountAndDate";

export const stockOverTime = (stocks, interval, setStockData) => {
  let stocksAmountAndDate = getAmountAndDate(stocks);
  stocks.forEach(async (stock) => {
    let amountAndDate = stocksAmountAndDate.find(
      (obj) => obj.name === stock.name
    );
    let stockToAppend = await yFinanceFetchStock(
      stock.symbol,
      undefined,
      undefined,
      undefined,
      interval,
      undefined,
      undefined,
      true
    );
    //create an array with all days between fetched range
    let allDays = [];
    let start = stockToAppend.at(-1).date;
    // let end = stockToAppend[0].date;
    let days = differenceInCalendarDays(
      // parseISO(end)
      new Date(),
      parseISO(start)
    );
    for (let i = 0; i <= days; i++) {
      let date = format(addDays(parseISO(start), i), "yyyy-MM-dd");
      let price = stockToAppend.find((day) => day.date === date);
      let amount =
        amountAndDate.days.find((day) => day.date === date)?.amount ?? 0;
      let day = {
        date,
        price: price?.value,
        amount,
        value: price?.value * amount || undefined,
      };
      allDays.push(day);
    }
    // fill voids caused by weekends or holidays => assing previous price and value if undefined
    let allDaysNoVoids = allDays.map((day, index, arr) => {
      let price = day.price;
      let value = day.value;

      if (typeof price === "undefined" && index !== 0) {
        let i = index - 1;
        price = arr[i].price;
        value = arr[i].value;
        while (typeof price === "undefined") {
          i--;
          price = arr[i].price;
          value = arr[i].value;
        }
      }
      let completeDay = {
        ...day,
        price,
        value,
      };
      return completeDay;
    });

    let newObj = {
      name: stock.name,
      fetched: stockToAppend,
      allDaysNoVoids,
    };
    setStockData((prev) => [...prev, newObj]);
  });
};
