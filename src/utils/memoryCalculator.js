// 存储器计算相关工具函数

/**
 * 判断一个数是否为2的幂次方
 * @param {number} num - 需要判断的数
 * @returns {boolean} - 如果是2的幂次方返回true，否则返回false
 */
export const isPowerOfTwo = (num) => {
  return num > 0 && (num & (num - 1)) === 0;
};

/**
 * 计算存储器地址线数量
 * @param {number} capacity - 存储器容量
 * @param {string} unit - 容量单位 (K, M, G 或空字符串)
 * @returns {number} - 地址线数量
 */
export const calculateAddressLines = (capacity, unit) => {
  const unitMultiplier =
    unit === "K"
      ? 1024
      : unit === "M"
        ? 1024 * 1024
        : unit === "G"
          ? 1024 * 1024 * 1024
          : 1;
  const totalBytes = capacity * unitMultiplier;
  return Math.ceil(Math.log2(totalBytes));
};

/**
 * 计算存储器数据线数量
 * @param {number} wordLength - 字长
 * @returns {number} - 数据线数量
 */
export const calculateDataLines = (wordLength) => {
  return wordLength;
};

/**
 * 验证存储器容量是否有效
 * @param {number} capacity - 存储器容量
 * @param {string} unit - 容量单位 (K, M, G 或空字符串)
 * @returns {boolean} - 如果容量有效返回true，否则返回false
 */
export const validateCapacity = (capacity, unit) => {
  // 当有单位（K、M、G）时，不需要校验是否为2的幂次方
  if (!unit && !isPowerOfTwo(Number(capacity))) {
    return false;
  }
  return true;
};

/**
 * 验证字长是否有效
 * @param {number} wordLength - 字长
 * @returns {boolean} - 如果字长有效返回true，否则返回false
 */
export const validateWordLength = (wordLength) => {
  if (Number(wordLength) < 1) {
    return false;
  }
  return true;
};
