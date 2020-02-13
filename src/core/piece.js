import { SHAPES } from "../constants";

class Piece {
  constructor(type = "L", position = { x: 3, y: 0 }, shapeState = 0) {
    this.type = type;
    this.position = position;
    this.shapes = SHAPES[type];
    this.shapeState = shapeState;
    this.shape = this.shapes[shapeState];
  }

  nextState = () => {
    let { shape, shapeState } = this;
    return shapeState >= shape.length ? 0 : (shapeState += 1);
  };

  move = (x, y) => {
    this.position.x = x;
    this.position.y = y;
  };

  rotate = () => {
    this.shapeState = this.nextState();
    this.shape = this.shapes[this.shapeState];
  };

  create(piece) {
    return new Piece(piece);
  }
}

export default Piece;
