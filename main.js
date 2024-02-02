class Segment {
  constructor(position, nextPosition) {
    this.position = position;
    this.nextPosition = nextPosition;
  }

  getPosition() {
    return this.position;
  }

  setPosition(value) {
    this.position = value;
  }

  getNextPosition() {
    return this.position;
  }

  setNextPosition(value) {
    this.position = value;
  }
}

class HeadSegment extends Segment {
  constructor(position, nextPosition, velocity) {
    super(position, nextPosition);
    this.velocity = velocity; // can be [1,0], [-1,0], [0, 1], [0, -1]
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(value) {
    this.velocity = value;
  }

  computeNextPosition() {
    return [
      this.nextPosition[0] + this.velocity[0],
      this.nextPosition[1] + this.velocity[1],
    ];
  }
}

class Food {
  constructor(INITIAL_POSITION = [8, 5]) {
    this.position = INITIAL_POSITION;
  }

  getPosition() {
    return this.position;
  }

  setPosition(value) {
    this.position = value;
  }
}

class Snake {
  constructor() {
    this.snake;
  }

  buildSnake(startSize, startPosition) {
    this.snake = [new HeadSegment(startPosition)];
    while (snake.length < startSize) {
      startPosition[0] = startPosition[0] - 1;
      this.snake.push(new Segment(startPosition.slice()));
    }
  }

  updatePositions() {
    const newHeading = this.snake[0].computeNextPosition();
    this.snake[0].setPosition(this.snake[0].getNextPosition());
    this.snake[0].setNextPosition(newHeading);
    for (let i = this.snake.length - 1; i > 1; i--) {
      this.snake[i].setPosition(this.snake[i].getNextPosition());
      this.snake[i].setNextPosition(this.snake[i - 1].getPosition());
    }
  }
}

class Board {
  constructor(COLUMN = 10, ROW = 10) {
    this.availableCells = this.buildBoard(COLUMN, ROW);
    this.unavailableCells = new Set();
  }

  buildBoard(columns, rows) {
    const boardCells = new Set();
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        boardCells.add(`${i},${j}`);
      }
    }
    return boardCells;
  }

  isAvailable(cell) {
    return this.availableCells.has(cell);
  }

  setUnavailable(cell) {
    if (!this.availableCells.has(cell)) throw console.error("not available");
    this.availableCells.delete(cell);
    this.unavailableCells.add(cell);
  }

  setAvailable(cell) {
    if (!this.unavailableCells.has(cell)) throw console.error("not available");
    this.unavailableCells.delete(cell);
    this.availableCells.add(cell);
  }
}

class GameController {
  constructor() {
    this.board = new Board();
    this.snake = new Snake();
  }

  reset() {
    START_SIZE = 3;
    START_POSITION = [5, 5];

    const snake = this.buildSnake(START_SIZE, START_POSITION);
  }

  isLose() {}
}

const game = new GameController();
game.reset();
debugger;
