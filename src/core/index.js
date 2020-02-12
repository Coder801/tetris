import hexToRgba from "hex-to-rgba";
import Board from "./board";
import Piece from "./piece";
import { COLS, ROWS } from "../constants";

const cloneDeepArray = array => JSON.parse(JSON.stringify(array));

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  UP: 38,
  SPACE: 32
};

class Tetris {
  constructor({ canvas }) {
    this.ctx = canvas;
    this.board = new Board(COLS, ROWS);
    this.piece = new Piece();
    this.timer = undefined;
    this.moves = {
      [KEY.LEFT]: () => this.move(-1, 0),
      [KEY.RIGHT]: () => this.move(1, 0),
      [KEY.DOWN]: () => this.move(0, 1),
      [KEY.UP]: () => this.rotate()
    };
  }

  rotate(x = 0, y = 0) {
    const { piece, board } = this;
    const { position, shapes, nextState } = piece;
    const incommingX = position.x + x;
    const incommingY = position.y + y;
    const incommingShape = shapes[nextState()];

    if (this.isValid(incommingX, incommingY, incommingShape)) {
      this.piece.rotate();
      this.updateBoardGrid(board, piece);
    }
  }

  move(x = 0, y = 0) {
    const { piece, board } = this;
    const { position } = piece;
    const incommingX = position.x + x;
    const incommingY = position.y + y;

    if (this.isValid(incommingX, incommingY, piece.shape)) {
      this.piece.move(incommingX, incommingY);
      this.updateBoardGrid(board, piece);
    }
  }

  isValid(x, y, shape) {
    const { grid } = this.board;

    const matrix = cloneDeepArray(grid);

    const validate = (x, y, shape) => {
      let valid = true;
      shape.forEach((row, keyY) => {
        row.forEach((element, keyX) => {
          const posX = keyX + x;
          const posY = keyY + y;

          if (!element && !matrix[posY]) {
            return;
          }

          if (element && !matrix[posY]) {
            valid = false;
            return;
          }

          if (matrix[posY][posX] === undefined && element) {
            valid = false;
            return;
          }

          if (
            element > 0 &&
            matrix[posY] &&
            matrix[posY][posX] &&
            matrix[posY][posX] > 0
          ) {
            valid = false;
          }
        });
      });

      return valid;
    };

    return validate(x, y, shape);
  }

  // TODO: Refactor this method
  draw(matrix) {
    this.ctx.clearRect(0, 0, 5000, 5000);
    matrix.forEach((row, keyY) => {
      row.forEach((element, keyX) => {
        if (element) {
          const colors = ["black", "#fcfcfc", "#d82800", "#2038ec"];

          const gradient = this.ctx.createLinearGradient(
            keyX,
            keyY,
            keyX + 1,
            keyY + 1
          );

          gradient.addColorStop(0, colors[1]);
          gradient.addColorStop(0.3, colors[element]);

          this.ctx.fillStyle = gradient;
          this.ctx.fillRect(keyX + 0.05, keyY + 0.05, 0.9, 0.9);

          this.ctx.strokeStyle = hexToRgba(colors[element], 0.5);
          this.ctx.lineWidth = 0.1;
          this.ctx.strokeRect(keyX, keyY, 1, 1);
        }
      });
    });
  }

  updateBoardGrid = () => {
    const matrix = cloneDeepArray(this.board.grid);
    const {
      position: { x, y },
      shape
    } = this.piece;

    shape.forEach((row, rowKey) => {
      row.forEach((cell, cellKey) => {
        if (matrix[rowKey + y] && cell) {
          matrix[rowKey + y][cellKey + x] = cell;
        }
      });
    });

    this.draw(matrix);
    return matrix;
  };

  drop = () => {
    this.move(0, 1);
    this.updateBoardGrid(this.board, this.piece);
  };

  controls = event => {
    const { keyCode } = event;
    const { position } = this.piece;
    const action = this.moves[keyCode];

    if (action) {
      action(position);
    }
  };

  start() {
    this.drop(this.board, this.piece);
    this.draw(this.board.grid);
    this.timer = setInterval(() => this.drop(this.board, this.piece), 3000000);

    document.addEventListener("keydown", this.controls);
  }

  pause() {
    clearInterval(this.timer);
  }
}

export default Tetris;
