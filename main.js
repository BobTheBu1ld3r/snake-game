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
