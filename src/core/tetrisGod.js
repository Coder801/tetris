import { SHAPES } from "../constants";
import { random } from "../helpers";

class TetrisGod {
  constructor() {
    this.shapes = this.getShapeList(SHAPES);
  }

  getShapeList(shapes) {
    return Object(shapes).keys;
  }

  static getShape() {
    const index = random(0, this.shapes.length);
    return this.shapes[index][0];
  }
}

export default TetrisGod;
