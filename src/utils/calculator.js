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

// 初始化 X（单符号位）
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
