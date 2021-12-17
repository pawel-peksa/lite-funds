const note = {
  Note: "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.",
};
export const checkNote = (data) => {
  if (data["Note"] === note["Note"]) {
    alert(
      "Our data provider limits data queries frequency to 5 calls per minute."
    );
  }
};
