class Level {
  constructor(config) {
    this.config = config;
    this.levelMatrix = this.loadLevelMatrix();
    this.tileMatrix = this.generateTileMatrix(this.levelMatrix[0].length, this.levelMatrix.length, 0);
  }
  loadLevelMatrix() {
    let newMatrix = [], emptyRow = [];
    for (let i = 0; i < this.config.levelMatrix[0].length + 2; i++)
      emptyRow.push(0);

    newMatrix.push(emptyRow);
    for (let i = 0; i < this.config.levelMatrix.length; i++)
      newMatrix.push([0, ...this.config.levelMatrix[i], 0]);
    newMatrix.push(emptyRow);

    return newMatrix;
  }
  generateTileMatrix(i, j) {
    let tileMatrix = generateMatrix(i, j, -1);
    this.forAllOnes(this.levelMatrix, (y, x) => {
      let newTile = new Tile(y, x);
      tileMatrix[y][x] = newTile;
    });
    return tileMatrix;
  }
  reset() {
    this.tileMatrix = this.generateTileMatrix(this.levelMatrix[0].length, this.levelMatrix.length, 0);
  }
  checkTileMatches() {
    return;
  }
  forAllZeros(matrix, callback) {
    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (!matrix[i][j])
          callback(i, j);
      }
    }
  }
  forAllOnes(matrix, callback) {
    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (matrix[i][j])
          callback(i, j);
      }
    }
  }
  forAllSpecific(matrix, val, callback) {
    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[i].length - 1; j++) {
        if (matrix[i][j] === val)
          callback(i, j);
      }
    }
  }
}