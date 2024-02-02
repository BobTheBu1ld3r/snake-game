class Segment {
  constructor(position, nextPosition) {
    this.position = position;
    this.nextPosition = nextPosition;
  }

  getPosition() {
    return this.position;
  }

  setPostition(value) {
    this.position = value;
  }

  getNextPosition() {
    return this.position;
  }

  setNextPostition(value) {
    this.position = value;
  }
}

class HeadSegment extends Segment {
  constructor(position, nextPosition, velocity) {
    super(position, nextPosition);
    this.velocity = velocity;
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(value) {
    this.velocity = value;
  }
}

class Board {
  constructor(COLUMN, ROW) {
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
  reset() {
    const START_SIZE = 3;
    const START_POSITION = [5, 5];

    const snake = this.buildSnake(START_SIZE, START_POSITION);
  }

  buildSnake(startSize, startPosition) {
    const snake = [new HeadSegment(startPosition)];
    while (snake.length < startSize) {
      startPosition[0] = startPosition[0] - 1;
      snake.push(new Segment(startPosition.slice()));
    }

    return snake;
  }
}

const game = new GameController();
game.reset();
debugger;
