import { createMultidimensionalArray } from "../helpers";

class Board {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.reset();
  }

  save(matrix) {
    this.grid = matrix;
  }

  reset() {
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard = () => createMultidimensionalArray(this.rows, this.cols);
}

export default Board;
