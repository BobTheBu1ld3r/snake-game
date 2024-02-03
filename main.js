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
    return this.nextPosition;
  }

  setNextPosition(value) {
    this.nextPosition = value;
  }
}

class HeadSegment extends Segment {
  constructor(position, velocity) {
    super(position);
    this.velocity = velocity; // can be [0,0], [1,0], [-1,0], [0, 1], [0, -1]
    this.nextPosition = this.computeNextPosition();
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(value) {
    this.velocity = value;
  }

  computeNextPosition() {
    return [
      this.position[0] + this.velocity[0],
      this.position[1] + this.velocity[1],
    ];
  }
}

class Food {
  constructor() {
    this.position;
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

  buildSnake(startSize, startPosition, startVelocity) {
    this.snake = [new HeadSegment(startPosition, startVelocity)];
    for (let i = 1; i < startSize; i++) {
      this.snake.push(
        new Segment(
          [startPosition[0] - i, startPosition[1]],
          this.snake[i - 1].getPosition()
        )
      );
    }
  }

  updatePositions() {
    this.snake[0].setPosition(this.snake[0].getNextPosition().slice());
    this.snake[0].setNextPosition(this.snake[0].computeNextPosition().slice());
    for (let i = 0; i < this.snake.length - 1; i++) {
      this.snake[i + 1].setPosition(
        this.snake[i + 1].getNextPosition().slice()
      );
      this.snake[i + 1].setNextPosition(this.snake[i].getPosition().slice());
    }
  }

  getPositions() {
    return this.snake.map((e) => e.getPosition());
  }

  getHeadNextPosition() {
    return this.snake[0].nextPosition;
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
    this.food = new Food();
  }

  reset() {
    const START_SIZE = 3;
    const START_POSITION = [5, 5];
    const START_VELOCITY = [1, 0];

    const FOOD_START_POSITION = [8, 5];

    this.snake.buildSnake(START_SIZE, START_POSITION, START_VELOCITY);
    this.food.setPosition(FOOD_START_POSITION);
  }

  update() {
    const loseState = 0;

    this.snake.updatePositions();
    if (this.isLose()) return loseState;
  }

  isLose() {
    const availableCells = new Set(this.board.buildBoard(10, 10));
    const unavailableCells = this.snake.getPositions();
    unavailableCells
      .map((e) => e.join(","))
      .forEach((e) => availableCells.delete(e));

    if (unavailableCells.includes(this.snake.getHeadNextPosition()))
      return true;
    else return false;
  }
}

const game = new GameController();
game.reset();
