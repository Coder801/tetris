class PlayArea {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.grid = [];
  }

  // Reset the board when we start a new game.
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }
}

export default PlayArea;
