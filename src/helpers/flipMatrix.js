const flipMatrix = matrix =>
  matrix[0].map((column, index) => matrix.map(row => row[index]));

export default flipMatrix;
