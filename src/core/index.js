import Board from "./board";
import Piece from "./piece";
import Render from "./render";
import { COLS, ROWS, COLORS, KEY, SHAPES } from "../constants";
import { random } from "../helpers";
//import hexToRgba from "hex-to-rgba";

const cloneDeepArray = array => JSON.parse(JSON.stringify(array));

class Tetris {
  constructor({ canvas }) {
    this.ctx = canvas;
    this.board = new Board(COLS, ROWS);
    this.piece = new Piece(this.getRandomShape());
    this.render = new Render(canvas);
    this.timer = undefined;
    this.moves = {
      [KEY.LEFT]: () => this.move(-1, 0),
      [KEY.RIGHT]: () => this.move(1, 0),
      [KEY.DOWN]: () => this.move(0, 1),
      [KEY.UP]: () => this.rotate()
    };
  }

  spawn() {
    this.piece = this.piece.create(this.getRandomShape());
  }

  getRandomShape() {
    const shapes = Object.keys(SHAPES);

    return shapes[random(0, shapes.length - 1)];
  }

  nextShapePosition(x, y) {
    const { position, shapes, nextState } = this.piece;

    return {
      nextX: position.x + x,
      nextY: position.y + y,
      nextShape: shapes[nextState()]
    };
  }

  rotate(x = 0, y = 0) {
    const { nextX, nextY, nextShape } = this.nextShapePosition(x, y);

    if (this.isValid(nextX, nextY, nextShape)) {
      this.piece.rotate();
    }
  }

  move(x = 0, y = 0) {
    const { shape } = this.piece;
    const { nextX, nextY } = this.nextShapePosition(x, y);

    if (this.isValid(nextX, nextY, shape)) {
      this.piece.move(nextX, nextY);
    }
  }

  isFall(x, y, shape) {
    const { grid } = this.board;

    const matrix = cloneDeepArray(grid);

    const validate = (x, y, shape) => {
      let valid = true;
      shape.forEach((row, keyY) => {
        row.forEach((element, keyX) => {
          const posX = keyX + x;
          const posY = keyY + y;

          if (element && !matrix[posY + 1]) {
            valid = false;
          }

          if (element && matrix[posY + 1] && matrix[posY + 1][posX]) {
            valid = false;
          }
        });
      });

      return valid;
    };

    return validate(x, y, shape);
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

  draw(matrix) {
    this.render.draw(matrix, COLORS);
  }

  updateBoard = () => {
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

  controls = event => {
    const { keyCode } = event;
    const { position, shape } = this.piece;

    const moveAction = this.moves[keyCode];

    if (moveAction) {
      if (this.isFall(position.x, position.y, shape)) {
        moveAction();
        this.updateBoard();
      } else {
        this.board.save(this.updateBoard());
        this.spawn();
      }
    }
  };

  start() {
    this.timer = setInterval(() => {
      this.move(0, 1);
      this.updateBoard();
    }, 5000);

    document.addEventListener("keydown", this.controls);
  }

  pause() {
    clearInterval(this.timer);
  }
}

export default Tetris;
