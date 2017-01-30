export const flatten = a => a;

export const divide = (x, y) => x / y;
export const divide10 = x => divide(x, 10);
export const divide1000 = x => divide(x, 1000);
export const multiply = (x, y) => x * y;
export const multiply10 = x => multiply(x, 10);
export const isThousands = num => num > 999;
export const appendWithK = num => `${num}k`;

export const roundToTenth = num => [num].map(multiply10)
                                      .map(Math.round)
                                      .map(divide10)
                                      .reduce(flatten);

export const getNumberInThousands = num => [num].map(divide1000)
                                                  .map(roundToTenth)
                                                  .map(appendWithK)
                                                  .reduce(flatten);


const numberToReadable = number => [number].map(parseInt)
                                      .map(n => isThousands(n) ? getNumberInThousands(n) : n) // eslint-disable-line no-confusing-arrow
                                      .reduce(flatten);

export default numberToReadable;
