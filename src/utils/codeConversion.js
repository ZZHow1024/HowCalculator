// 码制转换相关工具函数

// 从原码生成反码和补码
export function getCodesFromOriginal(original) {
  if (!original) return { original: "", onesComplement: "", twosComplement: "" };
  
  const signBit = original.charAt(0);
  const magnitude = original.slice(1);
  
  // 原码
  // 反码
  let onesComplement = original;
  if (signBit === "1") {
    onesComplement =
      signBit +
      magnitude
        .split("")
        .map((b) => (b === "0" ? "1" : "0"))
        .join("");
  }

  // 补码
  let twosComplement = onesComplement;
  if (signBit === "1") {
    // 补码 = 反码 + 1
    let carry = 1;
    let arr = onesComplement
      .slice(1)
      .split("")
      .reverse()
      .map((b) => {
        if (carry === 1) {
          if (b === "0") {
            carry = 0;
            return "1";
          } else {
            return "0";
          }
        }
        return b;
      })
      .reverse();
    twosComplement = signBit + arr.join("");
  }

  return {
    original,
    onesComplement,
    twosComplement,
  };
}

// 从反码生成原码和补码
export function getCodesFromOnesComplement(onesComplement) {
  if (!onesComplement) return { original: "", onesComplement: "", twosComplement: "" };
  
  const signBit = onesComplement.charAt(0);
  const value = onesComplement.slice(1);
  
  // 原码
  let original = onesComplement;
  if (signBit === "1") {
    original =
      signBit +
      value
        .split("")
        .map((b) => (b === "0" ? "1" : "0"))
        .join("");
  }
  
  // 补码
  let twosComplement = onesComplement;
  if (signBit === "1") {
    // 补码 = 反码 + 1
    let carry = 1;
    let arr = onesComplement
      .slice(1)
      .split("")
      .reverse()
      .map((b) => {
        if (carry === 1) {
          if (b === "0") {
            carry = 0;
            return "1";
          } else {
            return "0";
          }
        }
        return b;
      })
      .reverse();
    twosComplement = signBit + arr.join("");
  }
  
  return {
    original,
    onesComplement,
    twosComplement,
  };
}

// 从补码生成原码和反码
export function getCodesFromTwosComplement(twosComplement) {
  if (!twosComplement) return { original: "", onesComplement: "", twosComplement: "" };
  
  const signBit = twosComplement.charAt(0);
  
  // 如果是正数，三种码制相同
  if (signBit === "0") {
    return {
      original: twosComplement,
      onesComplement: twosComplement,
      twosComplement,
    };
  }
  
  // 负数，先求反码（补码-1）
  // 保持符号位不变
  let onesComplement = "";
  let borrow = 1;
  const digits = twosComplement.slice(1).split("").reverse();
  
  for (let i = 0; i < digits.length; i++) {
    if (borrow === 1) {
      if (digits[i] === "1") {
        onesComplement = "0" + onesComplement;
        borrow = 0;
      } else {
        onesComplement = "1" + onesComplement;
      }
    } else {
      onesComplement = digits[i] + onesComplement;
    }
  }
  
  // 添加符号位
  onesComplement = signBit + onesComplement;
  
  // 原码 = 反码取反（符号位不变）
  const original = signBit + 
    onesComplement
      .slice(1)
      .split("")
      .map((b) => (b === "0" ? "1" : "0"))
      .join("");
  
  return {
    original,
    onesComplement,
    twosComplement,
  };
}

// 根据符号位和数值部分生成原码
export function getOriginalCode(symbol, value) {
  // 只允许输入0/1
  const cleanValue = value.replace(/[^01]/g, "");
  return symbol + cleanValue;
}