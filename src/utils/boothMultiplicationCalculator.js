// 初始化 X（双符号位）
export const initializationX = (symbol, num) => {
  const yNum = []; // 原码
  const fNum = []; // 反码
  const bNum = []; // 补码
  const fbNum = []; // 相反数的补码

  // 初始化原码
  if (symbol === "0") {
    yNum.push(0);
    yNum.push(0);
  } else {
    yNum.push(1);
    yNum.push(1);
  }
  for (let i = 0; i < num.length; i++) yNum.push(num.charAt(i) - "0");

  // 初始化反码
  if (symbol === "0")
    // 正数
    for (let i = 0; i < yNum.length; i++) fNum.push(yNum[i]);
  else {
    // 负数
    fNum.push(1);
    fNum.push(1);
    for (let i = 2; i < yNum.length; i++) fNum.push(yNum[i] ? 0 : 1);
  }

  // 初始化补码
  if (symbol === "0")
    // 正数
    for (let i = 0; i < yNum.length; i++) bNum.push(yNum[i]);
  else {
    // 负数
    bNum.push(1);
    bNum.push(1);
    const temp = [];
    let c = 1;
    for (let i = fNum.length - 1; i >= 2; i--) {
      let t = c + fNum[i];
      if (t > 1) {
        t -= 2;
        c = 1;
      } else c = 0;

      temp.push(t);
    }

    temp.reverse().forEach((value) => bNum.push(value));
  }

  // 初始化相反数的补码
  if (symbol === "0") {
    // 负数反码
    const f = [];
    f.push(1);
    f.push(1);
    for (let i = 2; i < yNum.length; i++) f.push(yNum[i] ? 0 : 1);

    // 再求负数补码
    fbNum.push(1);
    fbNum.push(1);
    const temp = [];
    let c = 1;
    for (let i = f.length - 1; i >= 2; i--) {
      let t = c + f[i];
      if (t > 1) {
        t -= 2;
        c = 1;
      } else c = 0;

      temp.push(t);
    }

    temp.reverse().forEach((value) => fbNum.push(value));
  } else {
    // 负数
    fbNum.push(0);
    fbNum.push(0);
    for (let i = 2; i < yNum.length; i++) fbNum.push(yNum[i]);
  }

  return {
    bNum,
    fbNum,
  };
};

// 初始化 Y（单符号位）
export const initializationY = (symbol, num) => {
  const yNum = []; // 原码
  const fNum = []; // 反码
  const bNum = []; // 补码

  // 初始化原码
  if (symbol === "0") yNum.push(0);
  else yNum.push(1);
  for (let i = 0; i < num.length; i++) yNum.push(num.charAt(i) - "0");

  // 初始化反码
  if (symbol === "0")
    // 正数
    for (let i = 0; i < yNum.length; i++) fNum.push(yNum[i]);
  else {
    // 负数
    fNum.push(1);
    for (let i = 1; i < yNum.length; i++) fNum.push(yNum[i] ? 0 : 1);
  }

  // 初始化补码
  if (symbol === "0")
    // 正数
    for (let i = 0; i < yNum.length; i++) bNum.push(yNum[i]);
  else {
    // 负数
    bNum.push(1);
    const temp = [];
    let c = 1;
    for (let i = fNum.length - 1; i >= 1; i--) {
      let t = c + fNum[i];
      if (t > 1) {
        t -= 2;
        c = 1;
      } else c = 0;

      temp.push(t);
    }

    temp.reverse().forEach((value) => bNum.push(value));
  }

  return bNum;
};

// 补码一位乘法
export const supplementOneDigitMultiplication = (xb, xfb, yb) => {
  const res = [];

  let symbol1 = [];
  let num1 = [];
  let symbol2 = [];
  let num2 = [];
  let extendNum = [];

  let yny = 0; // Yn+1
  let xbStr = (xb[0] ? "11" : "00") + ".";
  let xfbStr = (xfb[0] ? "11" : "00") + ".";
  for (let i = 2; i < xb.length; i++) {
    xbStr += xb[i];
    xfbStr += xfb[i];
  }

  for (let i = 0; i < 2; i++) symbol1.push(0);
  for (let i = 2; i < xb.length; i++) num1.push(0);

  for (let step = 1; step <= yb.length; step++) {
    const yn = yb[yb.length - step]; // Yn
    let operate; // 操作
    let partialProduct; // 部分积
    let multiplier; // 乘数

    if (yn ^ yny) {
      symbol2 = [];
      num2 = [];
      if (yn === 0) {
        // +[X]补
        operate = "+[X]补";
        partialProduct = "+" + xbStr;
        for (let i = 0; i < 2; i++) symbol2.push(xb[i]);
        for (let i = 2; i < xb.length; i++) num2.push(xb[i]);
      } else {
        // +[-X]补
        operate = "+[-X]补";
        partialProduct = "+" + xfbStr;
        for (let i = 0; i < 2; i++) symbol2.push(xfb[i]);
        for (let i = 2; i < xb.length; i++) num2.push(xfb[i]);
      }

      const { symbol, num } = addition(symbol1, num1, symbol2, num2);
      symbol1 = symbol;
      num1 = num;
    } else {
      // 加零
      operate = "+0";
      partialProduct = "+00.";
      for (let i = 0; i < xb.length - 2; i++) partialProduct += "0";
    }

    partialProduct += "\n\u00A0\u00A0";
    for (let i = 0; i < symbol1.length + num1.length; i++)
      partialProduct += "-";

    // 加操作完的部分积
    partialProduct += "\n\u00A0\u00A0";
    for (let i = 0; i < symbol1.length; i++) partialProduct += symbol1[i];
    partialProduct += ".";
    for (let i = 0; i < num1.length; i++) partialProduct += num1[i];

    // 算术右移（最后一步不右移）
    if (step !== yb.length) {
      const res = arithmeticShiftRight(symbol1, num1, extendNum);

      num1 = res.num;
      extendNum = res.totalNum;

      // 右移后的部分积
      partialProduct += "\n\u00A0\u00A0";
      for (let i = 0; i < symbol1.length; i++) partialProduct += symbol1[i];
      partialProduct += ".";
      for (let i = 0; i < xb.length - 2; i++) partialProduct += num1[i];
    }

    // 右移后的乘数
    multiplier = "";
    for (let i = 0; i < extendNum.length; i++) multiplier += extendNum[i];
    if (step !== yb.length) {
      multiplier += yb[0] + ".";
      for (let i = 1; i < yb.length - step; i++) multiplier += yb[i];
    }

    yny = yn;

    const data = {
      step: step,
      operate: operate + (step === yb.length ? "" : "\n\n\n右移→"),
      partialProduct,
      multiplier: (step === yb.length ? "\n\n" : "\n\n\n") + multiplier,
      yny: step === yb.length ? "" : "\n\n\n" + yny,
    };

    res.push(data);
  }

  return {
    res,
    symbol1,
    num1,
    extendNum,
  };
};

// 双符号位相加
const addition = (symbol1, num1, symbol2, num2) => {
  let c = 0;
  let symbol = [];
  let num = [];

  for (let i = num1.length - 1; i >= 0; i--) {
    let t = num1[i] + num2[i] + c;
    if (t > 1) {
      t -= 2;
      c = 1;
    } else {
      c = 0;
    }

    num = [t, ...num];
  }

  for (let i = symbol1.length - 1; i >= 0; i--) {
    let t = symbol1[i] + symbol2[i] + c;
    if (t > 1) {
      t -= 2;
      c = 1;
    } else {
      c = 0;
    }

    symbol = [t, ...symbol];
  }

  return {
    symbol,
    num,
  };
};

// 算术右移操作
const arithmeticShiftRight = (symbol1, num1, totalNum) => {
  totalNum = [num1[num1.length - 1], ...totalNum];

  let num = [symbol1[0]];
  for (let i = 0; i < num1.length - 1; i++) num.push(num1[i]);

  return {
    symbol1,
    num,
    totalNum,
  };
};
