var numberToPrice = function (number) {
  if (typeof number === "string") {
    return 'NaN';
  } else if (number < 0) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } else {
    let num2 = Number(number.toString().match(/^\d+(?:\.\d{0,2})?/));
    return num2.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
};

console.log(numberToPrice(-5));
