const shapes = {
  I: [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  J: [
    [
      [0, 0, 0],
      [3, 3, 3],
      [0, 0, 3]
    ],
    [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0]
    ],
    [
      [3, 0, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    [
      [0, 3, 3],
      [0, 3, 0],
      [0, 3, 0]
    ]
  ],
  L: [
    [
      [0, 0, 0],
      [2, 2, 2],
      [2, 0, 0]
    ],
    [
      [2, 2, 0],
      [0, 2, 0],
      [0, 2, 0]
    ],
    [
      [0, 0, 2],
      [2, 2, 2],
      [0, 0, 0]
    ],
    [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2]
    ]
  ],
  O: [
    [
      [1, 1],
      [1, 1]
    ]
  ],
  S: [
    [
      [0, 0, 0],
      [0, 3, 3],
      [3, 3, 0]
    ],
    [
      [0, 3, 0],
      [0, 3, 3],
      [0, 0, 3]
    ]
  ],
  Z: [
    [
      [0, 0, 0],
      [2, 2, 0],
      [0, 2, 2]
    ],
    [
      [0, 2, 0],
      [2, 2, 0],
      [2, 0, 0]
    ]
  ],
  T: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ]
  ]
};

class Piece {
  constructor(type = "L", position = { x: 3, y: 0 }, shapeState = 0) {
    this.type = type;
    this.position = position;
    this.shapes = shapes[type];
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
}

export default Piece;
