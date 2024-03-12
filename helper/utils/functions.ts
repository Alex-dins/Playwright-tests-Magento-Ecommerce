export const numberConverter = function (price: string) {
  return parseInt(price.replace("$", ""));
};
