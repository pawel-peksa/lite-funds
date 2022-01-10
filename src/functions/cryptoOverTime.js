import { getCryptoHistory } from "../api/cryptoApi2";
import { getAmountAndDate } from "../functions/getAmountAndDate";

export const cryptoOverTime = (crypto, interval, setCryptoData) => {
  let cryptoAmountAndDate = getAmountAndDate(crypto);
  crypto.forEach(async (crypto) => {
    let amountAndDate = cryptoAmountAndDate.find(
      (obj) => obj.name === crypto.name
    );
    let fetchedCrypto = await getCryptoHistory(
      crypto.name.toLowerCase(),
      "eur",
      interval,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );

    //remove first day data duplication
    fetchedCrypto.shift();
    fetchedCrypto.reverse();
    let cryptoToAppend = fetchedCrypto.map((day) => {
      let dayOfInterest = amountAndDate.days.find(
        (amountAndDateDay) => amountAndDateDay.date === day.date
      );
      let amount = dayOfInterest?.amount ?? 0;
      return {
        date: day.date,
        price: day.value,
        amount,
        value: day.value * amount,
      };
    });

    let newObj = {
      name: crypto.name,
      allDays: cryptoToAppend,
    };
    setCryptoData((prev) => [...prev, newObj]);
  });
};
