import flipMatrix from "./flipMatrix";

const rotateMatrixClockwise = matrix => flipMatrix(matrix.reverse());

export default rotateMatrixClockwise;
