const createMultidimensionalArray = (cols, rows = cols, fill = 0) =>
  Array.from({ length: cols }, () => Array(rows).fill(fill));

export default createMultidimensionalArray;
