import BigNumber from "bignumber.js";

// 二进制转十进制
export const binaryToDecimal = (binary) => {
  return new BigNumber(binary, 2).toString(10);
};

// 八进制转十进制
export const octalToDecimal = (octal) => {
  return new BigNumber(octal, 8).toString(10);
};

// 十六进制转十进制
export const hexadecimalToDecimal = (hexadecimal) => {
  return new BigNumber(hexadecimal, 16).toString(10);
};

// 十进制转二进制
export const decimalToBinary = (decimal) => {
  return new BigNumber(decimal, 10).toString(2);
};

// 十进制转八进制
export const decimalToOctal = (decimal) => {
  return new BigNumber(decimal, 10).toString(8);
};

// 十进制转十六进制
export const decimalToHexadecimal = (decimal) => {
  return new BigNumber(decimal, 10).toString(16).toUpperCase();
};
