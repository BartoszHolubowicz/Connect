class Vect {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static add(v1, v2) {
    return Vector(v1.x + v2.x, v1.y + v2.y);
  }
  add(v) {
    return Vector(this.x + v.x, this.y + v.y);
  }
  static subtract(v1, v2) {
    return Vector(v1.x - v2.x, v1.y - v2.y);
  }
  subtract(v) {
    return Vector(this.x - v.x, this.y - v.y);
  }
  static multiply(v, a) {
    if (a instanceof Vector)
      return Vector(v.x * a.x, v.y * a.y);
    else
      return Vector(v.x * a, v.y * a);
  }
  multiply(a) {
    if (a instanceof Vector)
      return Vector(this.x * a.x, this.y * a.y);
    else
      return Vector(this.x * a, this.y * a);
  }
  static divide(v, a) {
    if (a instanceof Vector)
      return Vector(v.x / a.x, v.y / a.y);
    else
      return Vector(v.x / a, v.y / a);
  }
  divide(a) {
    if (a instanceof Vector)
      return Vector(this.x / a.x, this.y / a.y);
    else
      return Vector(this.x / a, this.y / a);
  }
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  rotatedBy(angle) {
    return Vector(Math.cos(this.x) - Math.sin(this.y), Math.sin(this.x) + Math.cos(this.y));
  }
}

function Vector(x = 0, y = 0) {
  return new Vect(x, y);
}